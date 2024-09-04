/* Your Code Here */
// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const timeInEvents = [];
    const timeOutEvents = [];
    let newObj = {
        firstName: firstName, 
        familyName: familyName, 
        title:title, 
        payPerHour:payPerHour, 
        timeInEvents:timeInEvents, 
        timeOutEvents:timeOutEvents}
    return newObj;
}

function createEmployeeRecords(employeeData){
    let employeeRecords = [];
    
    employeeData.forEach(data => {
        let employeeRecord = createEmployeeRecord(data);
        employeeRecords.push(employeeRecord);
      });
    
      return employeeRecords;
    }
    
    function createEmployeeRecord(data) {
      let employeeRecord = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
      };
    
      return employeeRecord;
    };

    function createTimeInEvent(employeeRecord, dateStamp) {
      if (!employeeRecord.timeInEvents) {
        employeeRecord.timeInEvents = [];
      }
      
    
      [date, time] = dateStamp.split(' ');
      const hour = parseInt(time.slice(0, 2))*100; // assuming the hour is always in two-digit format
      console.log(employeeRecord)
      employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date:date
      });
    
      return employeeRecord.timeInEvents;
    }

      function createTimeOutEvent(employeeRecord, dateStamp) {
        const [date, time] = dateStamp.split(' ');
        const hour = parseInt(time.slice(0, 2) *100); // assuming the hour is always in two-digit format
      
        employeeRecord.timeOutEvents.push({
          type: "TimeOut",
          hour,
          date
        });
      
        return employeeRecord;
      }

      function hoursWorkedOnDate(employeeRecord, date){
        const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
        const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100;
        return hoursWorked;
      }

      function wagesEarnedOnDate(employeeRecord, date){
        const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        const payPerHour = employeeRecord.payPerHour;
        
        const payOwed = hoursWorked * payPerHour;
        
        return payOwed;
      }

    //   function allWagesFor(employeeRecord){
    //     const dates = employeeRecord.timeInEvents.map(event => event.date);

    //     const totalWages = dates.reduce((total, date) => {
    //       const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
    //       return total + wagesEarned;
    //     }, 0);
      
    //     return totalWages;
    //   }

      function calculatePayroll(employeeRecords) {
        let totalPay = 0;
      
        for (const employeeRecord of employeeRecords) {
          for (const event of employeeRecord.timeInEvents) {
            const date = event.date;
            const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
            totalPay += wagesEarned;
          }
        }
      
        return totalPay;
      }
      

      
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

