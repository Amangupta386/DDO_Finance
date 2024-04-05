

const calculateDailyWages = (monthlySalary, weekendDays) => {
    const workingDaysInMonth = 20; // Adjust this based on your organization's policy
    const dailyRate = monthlySalary / workingDaysInMonth;
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const dailyWages = Array.from({ length: workingDaysInMonth }, (_, day) => {
      const dayOfWeek = daysOfWeek[new Date(2023, 0, day + 1).getDay()]; // Replace 2023 and 0 with the desired year and month
      const wage = weekendDays.includes(dayOfWeek) ? dailyRate : dailyRate; // Adjust the logic as needed
      return { day: day + 1, dayOfWeek, wage };
    });
  
    return dailyWages;
};

const calculatePerDayWages = (monthlySalary, weekendDays) => {
    const workingDaysInMonth = 20; // Adjust this based on your organization's policy
    const totalWorkingDays = workingDaysInMonth - weekendDays.length; // Deduct the number of weekend days
  
    const dailyRate = monthlySalary / totalWorkingDays;
  
    return dailyRate;
};

const daysBetweenDates = (date1, date2) => {
    const [day1, month1, year1] = date1.split('/').map(Number);
    const [day2, month2, year2] = date2.split('/').map(Number);
  
    const dateObject1 = new Date(year1, month1 - 1, day1);
    const dateObject2 = new Date(year2, month2 - 1, day2);
  
    const timeDifference = dateObject2 - dateObject1;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    return Math.abs(daysDifference);
};

const calculatePercentageProgress = (startDate, endDate) => {
    const currentDate = new Date();
  
    // Ensure the current date is within the range
    const effectiveStartDate = startDate < currentDate ? currentDate : startDate;
  
    // Calculate the total number of milliseconds in the date range
    const totalMilliseconds = endDate - effectiveStartDate;
  
    // Calculate the elapsed time from the start date to the current date
    const elapsedMilliseconds = currentDate - effectiveStartDate;
  
    // Calculate the percentage progress
    const percentage = (elapsedMilliseconds / totalMilliseconds) * 100;
  
    return percentage;
}

const calculatePercentageDays = (startDate, endDate) => {
    // Step 1: Find the total number of days in the month
    const currentDate = new Date(startDate);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
  
    // Step 2: Find the number of days between the two given dates
    const daysBetween = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;
  
    // Step 3: Calculate the percentage
    const percentage = (daysBetween / totalDaysInMonth) * 100;
  
    return percentage;
}

module.exports = {
    calculateDailyWages,
    calculatePerDayWages,
    daysBetweenDates,
    calculatePercentageProgress,
    calculatePercentageDays
};
  