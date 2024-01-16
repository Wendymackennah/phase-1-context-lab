function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
    hoursWorkedOnDate: hoursWorkedOnDate,
    wagesEarnedOnDate: wagesEarnedOnDate,
    allWagesFor: allWagesFor,
    createTimeInEvent: createTimeInEvent,
    createTimeOutEvent: createTimeOutEvent,
  };
}

function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  };

  this.timeInEvents.push(timeInEvent);

  return this;
}
createEmployeeRecord.prototype.createTimeInEvent = createTimeInEvent;

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  };

  this.timeOutEvents.push(timeOutEvent);

  return this;
}
createEmployeeRecord.prototype.createTimeOutEvent = createTimeOutEvent;

function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

  if (timeInEvent && timeOutEvent) {
    const timeInHour = Math.floor(timeInEvent.hour / 100);
    const timeOutHour = Math.floor(timeOutEvent.hour / 100);

    const hoursWorked = timeOutHour - timeInHour;
    return hoursWorked;
  } else {
    return 0;
  }
}
createEmployeeRecord.prototype.hoursWorkedOnDate = hoursWorkedOnDate;

function wagesEarnedOnDate(date) {
  const hoursWorked = this.hoursWorkedOnDate(date);
  const payOwed = hoursWorked * this.payPerHour;

  return payOwed;
}

function allWagesFor() {
  const datesWorked = this.timeInEvents
    .filter((timeInEvent) =>
      this.timeOutEvents.some(
        (timeOutEvent) => timeOutEvent.date === timeInEvent.date
      )
    )
    .map((timeInEvent) => timeInEvent.date);

  const totalWages = datesWorked.reduce(
    (sum, date) => sum + this.wagesEarnedOnDate(date),
    0
  );

  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeeArray) {
  return employeeArray.reduce(
    (totalPayroll, employee) => totalPayroll + employee.allWagesFor(),
    0
  );
}
