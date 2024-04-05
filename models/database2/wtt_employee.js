const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTT_Employee = sequelize2.define('WTT_Employee', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    sort: DataTypes.BIGINT,
    createdById: DataTypes.BIGINT,
    updatedById: DataTypes.BIGINT,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    EmployeeCode: { type: DataTypes.STRING, unique: true },
    IsActive: { type: DataTypes.STRING, defaultValue: 'true' },
    FK_reportingmngr_WTT_Employee_ID: DataTypes.BIGINT,
    FK_WTT_Master_Emp_Designation_ID: DataTypes.BIGINT,
    FK_WTT_Master_Emp_Department_ID: DataTypes.BIGINT,
    JoiningDate: DataTypes.DATE,
    ConfirmationDate: DataTypes.DATEONLY,
    EmergencyContactName: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    BloodGroup: DataTypes.STRING,
    MaritalStatus: DataTypes.STRING,
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.STRING,
    AddressType: DataTypes.STRING,
    EmploymentStatus: DataTypes.STRING,
    EmploymentType: DataTypes.STRING,
    AadhaarNo: DataTypes.STRING,
    pan: DataTypes.STRING,
    CurrentLocation: DataTypes.STRING,
    operationMode: { type: DataTypes.STRING, defaultValue: 'WFO' },
    ResignationDate: DataTypes.DATE,
    tempAddress1: DataTypes.STRING,
    tempAddress2: DataTypes.STRING,
    tempZIP: DataTypes.STRING,
    BaseLocation: DataTypes.STRING,
    FullName: DataTypes.STRING,
    FK_User_ID: DataTypes.BIGINT,
    FK_WTT_Employee_ID: DataTypes.BIGINT,
    isAddressSame: DataTypes.BOOLEAN,
    fatherMotherName: DataTypes.STRING,
    lastWorkingDay: DataTypes.DATE,
    separationReason: DataTypes.STRING,
    fnfDate: DataTypes.DATE,
    fnfRemarks: DataTypes.STRING,
    FK_WTT_Cities_ID: DataTypes.BIGINT,
    FK_WTT_States_ID: DataTypes.BIGINT,
    FK_WTT_Temp_Cities_ID: DataTypes.BIGINT,
    FK_WTT_Temp_State_ID: DataTypes.BIGINT,
    tempCountry: DataTypes.STRING,
    mobile: DataTypes.STRING,
    EmailAddress: { type: DataTypes.STRING, unique: true },
    EmergencyContactNo: DataTypes.STRING,
    PersonalEmail: { type: DataTypes.STRING, unique: true },
    fk_roles_id: DataTypes.STRING,
    codePlusFullName: DataTypes.STRING,
    RMChangeReason: DataTypes.TEXT,
    f_vr416nk8smf: DataTypes.STRING,
  }, {
    tableName: 'WTT_Employee',
    timestamps: false, // Set to true if you want Sequelize to manage timestamps
  });

  // Define any associations or additional configurations here

module.exports = {
    WTT_Employee, // Export the model
    sequelize2, // Export the instance
};