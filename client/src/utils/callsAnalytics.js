export function calculateTotalCalls(calls) {
    const callsArray = calls?.default || [];
    return calls.length;
  }
  
  export function calculateAverageCallDuration(calls) {
    const callsArray = calls?.default || [];

    console.log(callsArray);
    const completedCalls = callsArray.filter(call => call.status === 'completed');
    if (completedCalls.length === 0) return 0;
  
    const totalDuration = completedCalls.reduce((sum, call) => {
      const startTime = new Date(call.start_time);
      const endTime = new Date(call.end_time);
      return sum + (endTime - startTime) / 1000;
    }, 0);
  
    return totalDuration / completedCalls.length;
  }
  
  export function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  export function calculateMissedCallPercentage(calls) {
    const callsArray = calls?.default || [];
    const totalCalls = calls.length;
    if (totalCalls === 0) return 0;
  
    const missedCalls = callsArray.filter(call => call.status === 'missed').length;
    return (missedCalls / totalCalls) * 100;
  }
  
  export function getCallsDistributionByHour(calls) {
    const callsArray = calls?.default || [];
    const hourlyDistribution = Array(24).fill(0);
  
    callsArray.forEach(call => {
      const hour = new Date(call.start_time).getHours();
      hourlyDistribution[hour]++;
    });
  
    return hourlyDistribution.map((count, hour) => ({ hour, count }));
  }
  
  export function getCallStatusDistribution(calls) {
    const callsArray = calls?.default || [];
    const totalCalls = calls.length;
    const statusCounts = { completed: 0, missed: 0, rejected: 0 };
  
    callsArray.forEach(call => {
      if (statusCounts.hasOwnProperty(call.status)) {
        statusCounts[call.status]++;
      }
    });
  
    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: totalCalls > 0 ? (count / totalCalls) * 100 : 0
    }));
  }
  
  export function getAverageDurationByCategory(calls) {
    const callsArray = calls?.default || [];
    const categories = {};
  
    callsArray.forEach(call => {
      if (call.status !== 'completed') return;
  
      if (!categories[call.category]) {
        categories[call.category] = { totalDuration: 0, count: 0 };
      }
  
      const startTime = new Date(call.start_time);
      const endTime = new Date(call.end_time);
      const durationInSeconds = (endTime - startTime) / 1000;
  
      categories[call.category].totalDuration += durationInSeconds;
      categories[call.category].count++;
    });
  
    return Object.entries(categories).map(([category, data]) => ({
      category,
      averageDuration: data.count > 0 ? data.totalDuration / data.count : 0,
      averageDurationFormatted: formatDuration(data.count > 0 ? data.totalDuration / data.count : 0)
    }));
  }
  