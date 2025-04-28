<template>
  <div class="settings-container">
    <Header />
    <SideBar />

    <main class="main-content">
      <div class="toolbar">
        <InputText
          v-model="searchQuery"
          placeholder="Поиск пользователей..."
          class="search-input"
        />
        <Button
          style="background-color: #e2287f"
          label="Добавить пользователя"
          @click="openCreateDialog"
        />
      </div>

      <div class="users-table-section">
        <DataTable
          :value="filteredUsers"
          dataKey="id"
          class="p-datatable-sm"
          :filterDisplay="'row'"
        >
          <Column field="name" header="Имя"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="role" header="Роль"></Column>

          <Column header="Действия" style="width: 180px">
            <template #body="slotProps">
              <div class="actions">
                <Button
                  icon="pi pi-pencil"
                  text
                  @click="openEditDialog(slotProps.data)"
                  class="p-button-sm p-button-info"
                />
                <Button
                  icon="pi pi-trash"
                  text
                  severity="danger"
                  @click="deleteUser(slotProps.data)"
                  class="p-button-sm p-button-danger"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="userDialog"
        header="Пользователь"
        :modal="true"
        class="p-fluid"
        :style="{ width: '400px' }"
      >
        <div class="field">
          <label for="name">Имя</label>
          <InputText id="name" v-model="userForm.name" />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <InputText id="email" v-model="userForm.email" />
        </div>

        <div class="field">
          <label for="role">Роль</label>
          <Dropdown
            id="role"
            v-model="userForm.role"
            :options="roles"
            placeholder="Выберите роль"
          />
        </div>

        <div class="field" v-if="!editingUser">
          <label for="password">Пароль</label>
          <Password id="password" v-model="userForm.password" toggleMask />
        </div>

        <template #footer>
          <Button label="Отмена" icon="pi pi-times" text @click="hideDialog" />
          <Button label="Сохранить" icon="pi pi-check" @click="saveUser" />
        </template>
      </Dialog>

      <ConfirmDialog />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Header from "../components/Header.vue";
import SideBar from "../components/SideBar.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import ConfirmDialog from "primevue/confirmdialog";
import confirmDialog from "primevue/confirmdialog";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const users = ref([]);
const searchQuery = ref("");
const userDialog = ref(false);
const editingUser = ref(false);
const userForm = ref({
  id: null,
  name: "",
  email: "",
  role: "",
  password: "",
});

const roles = ["Администратор", "Менеджер", "Оператор"];
const toast = useToast();

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    return (
      name.includes(searchQuery.value.toLowerCase()) ||
      email.includes(searchQuery.value.toLowerCase())
    );
  });
});

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8000/users");
    users.value = res.data;
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
  }
};

const openCreateDialog = () => {
  editingUser.value = false;
  userForm.value = {
    id: null,
    name: "",
    email: "",
    role: "",
    password: "",
  };
  userDialog.value = true;
};

const openEditDialog = (user) => {
  editingUser.value = true;
  userForm.value = { ...user, password: "" };
  userDialog.value = true;
};

const saveUser = async () => {
  try {
    if (editingUser.value) {
      await axios.patch(`http://localhost:8000/users/${userForm.value.id}`, {
        name: userForm.value.name,
        email: userForm.value.email,
        role: userForm.value.role,
      });
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Пользователь обновлен",
        life: 3000,
      });
    } else {
      await axios.post("http://localhost:8000/users", userForm.value);
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Пользователь создан",
        life: 3000,
      });
    }
    fetchUsers();
    hideDialog();
  } catch (error) {
    console.error("Ошибка при сохранении пользователя:", error);
  }
};

const deleteUser = (user) => {
  confirm.require({
    message: `Вы уверены, что хотите удалить ${user.name}?`,
    header: "Подтверждение",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await axios.delete(`http://localhost:8000/users/${user.id}`);
        toast.add({
          severity: "success",
          summary: "Удалено",
          detail: "Пользователь удален",
          life: 3000,
        });
        fetchUsers();
      } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
      }
    },
  });
};


const hideDialog = () => {
  userDialog.value = false;
};
import { h, resolveComponent } from "vue";

const actionTemplate = (user) => {
  return h("div", { class: "actions" }, [
    h("Button", {
      icon: "pi pi-pencil",
      text: true,
      onClick: () => openEditDialog(user),
    }),
    h("Button", {
      icon: "pi pi-trash",
      text: true,
      severity: "danger",
      onClick: () => deleteUser(user),
    }),
  ]);
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.settings-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

.actions {
  display: flex;
  gap: 8px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin-right: 20px;
  max-width: 400px;
}

.main-content {
  grid-area: main;
  background-color: #f5f6fa;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
}

.users-table-section {
  background: white;
  border-radius: 5px;
  padding: 15px;
}

.field {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
