const wttEmployeeController = require("../database2/wttEmployeeController");
const resourceCostActualBreakdownByMonthController = require("../database1/resourceCostActualBreakdownByMonthController");
const resourceCostForecastedBreakdownByMonthController = require("../database1/resourceCostForecastBreakdownByMonth");
const {
  ResourceCostActualBreakdownByMonth,
} = require("../../models/database1/ResourceCostActualBreakdownByMonth");
const {
  ResourceCostForecastedBreakdownByMonth,
} = require("../../models/database1/ResourceCostForecastBreakdownByMonth");
const resourceCostControllers = require("../database1/resourceCostController");

const sumOfMonthToActualResources = async (req, res) => {
  try {
    const employees = await wttEmployeeController.getAllEmployees2();
    const resource = await resourceCostControllers.getResourceCostByEmployeeId(
      req
    );
    const resourceCostBreakdown =
      await resourceCostActualBreakdownByMonthController.getResourceCostByEmployeeId(
        req
      );
    const totalValue =
      parseInt(resource["monthlyCostComp1"]) +
      parseInt(resource["monthlyCostComp2"]) +
      parseInt(resource["monthlyCostComp3"]) +
      parseInt(resource["monthlyCostComp4"]);
    // ('totalValue: ',totalValue);
    // ("resourceCost: ", resourceCostBreakdown);
    let combinedData;
    const employeeCode = employees?.find(
      (emp) => emp["id"] === resourceCostBreakdown["FK_WTT_Employee_ID"]
    );
    const body = {
      sort: resourceCostBreakdown["sort"],
      createdById: resourceCostBreakdown["createdById"],
      updatedById: resourceCostBreakdown["updatedById"],
      FK_FinancialYear_ID: resourceCostBreakdown["FK_FinancialYear_ID"],
      FK_WTT_Project_ID: resourceCostBreakdown["FK_WTT_Project_ID"],
      FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
      // Monthly breakdowns
      april: totalValue,
      aprilComment: resourceCostBreakdown["aprilComment"],
      may: totalValue,
      mayComment: resourceCostBreakdown["mayComment"],
      june: totalValue,
      juneComment: resourceCostBreakdown["juneComment"],
      july: totalValue,
      julyComment: resourceCostBreakdown["julyComment"],
      august: totalValue,
      augustComment: resourceCostBreakdown["augustComment"],
      september: totalValue,
      septemberComment: resourceCostBreakdown["septemberComment"],
      october: totalValue,
      octoberComment: resourceCostBreakdown["octoberComment"],
      november: totalValue,
      novemberComment: resourceCostBreakdown["novemberComment"],
      december: totalValue,
      decemberComment: resourceCostBreakdown["decemberComment"],
      january: totalValue,
      januaryComment: resourceCostBreakdown["januaryComment"],
      february: totalValue,
      februaryComment: resourceCostBreakdown["februaryComment"],
      march: totalValue,
      marchComment: resourceCostBreakdown["februaryComment"],
    };
    const updatedBody = {
      FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
      // Monthly breakdowns
      april: totalValue,
      may: totalValue,
      june: totalValue,
      july: totalValue,
      august: totalValue,
      september: totalValue,
      october: totalValue,
      november: totalValue,
      december: totalValue,
      january: totalValue,
      february: totalValue,
      march: totalValue,
    };
    if (!employeeCode) {
      combinedData =
        await resourceCostActualBreakdownByMonthController.createRecord(body);
    } else {
      const [actualRowsAffected] =
        await ResourceCostActualBreakdownByMonth.update(updatedBody, {
          where: {
            FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
          },
        });

      // resourceCostActualBreakdownByMonthController.updateRecord(body);
      if (actualRowsAffected > 0) {
        // Success: Rows were updated
        combinedData = updatedBody; // Return the updated body
      } else {
        // No rows were updated, handle accordingly
        return res.status(404).json({ error: "No records were updated." });
      }
    }
    return res.json(combinedData);

    // if(resourceCostBreakdown){
  } catch (error) {
    console.error('actual error: ',error);    
    return res.status(500).json({ error: "Internal server error" });
  }
};

const sumOfMonthToForecastedResources = async (req, res) => {
  try {
    const employees = await wttEmployeeController.getAllEmployees2();
    const resource = await resourceCostControllers.getResourceCostByEmployeeId(
      req
    );
    const resourceCostBreakdown =
      await resourceCostForecastedBreakdownByMonthController.getResourceCostByEmployeeId(
        req
      );
    const totalValue =
      parseInt(resource["monthlyCostComp1"]) +
      parseInt(resource["monthlyCostComp2"]) +
      parseInt(resource["monthlyCostComp3"]) +
      parseInt(resource["monthlyCostComp4"]);
    // ('totalValue: ',totalValue);
    // ("resourceCost: ", resourceCostBreakdown);
    let combinedData;
    const employeeCode = employees?.find(
      (emp) => emp["id"] === resourceCostBreakdown["FK_WTT_Employee_ID"]
    );
    const body = {
      sort: resourceCostBreakdown["sort"],
      createdById: resourceCostBreakdown["createdById"],
      updatedById: resourceCostBreakdown["updatedById"],
      FK_FinancialYear_ID: resourceCostBreakdown["FK_FinancialYear_ID"],
      FK_WTT_Project_ID: resourceCostBreakdown["FK_WTT_Project_ID"],
      FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
      // Monthly breakdowns
      april: totalValue,
      aprilComment: resourceCostBreakdown["aprilComment"],
      may: totalValue,
      mayComment: resourceCostBreakdown["mayComment"],
      june: totalValue,
      juneComment: resourceCostBreakdown["juneComment"],
      july: totalValue,
      julyComment: resourceCostBreakdown["julyComment"],
      august: totalValue,
      augustComment: resourceCostBreakdown["augustComment"],
      september: totalValue,
      septemberComment: resourceCostBreakdown["septemberComment"],
      october: totalValue,
      octoberComment: resourceCostBreakdown["octoberComment"],
      november: totalValue,
      novemberComment: resourceCostBreakdown["novemberComment"],
      december: totalValue,
      decemberComment: resourceCostBreakdown["decemberComment"],
      january: totalValue,
      januaryComment: resourceCostBreakdown["januaryComment"],
      february: totalValue,
      februaryComment: resourceCostBreakdown["februaryComment"],
      march: totalValue,
      marchComment: resourceCostBreakdown["februaryComment"],
    };
    const updatedBody = {
      FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
      // Monthly breakdowns
      april: totalValue,
      may: totalValue,
      june: totalValue,
      july: totalValue,
      august: totalValue,
      september: totalValue,
      october: totalValue,
      november: totalValue,
      december: totalValue,
      january: totalValue,
      february: totalValue,
      march: totalValue,
    };
    if (!employeeCode) {
      combinedData =
        await resourceCostForecastedBreakdownByMonthController.createRecord(
          body
        );
    } else {
      combinedData = await ResourceCostForecastedBreakdownByMonth.update(
        updatedBody,
        {
          where: {
            FK_WTT_Employee_ID: resourceCostBreakdown["FK_WTT_Employee_ID"],
          },
        }
      );

      // // resourceCostActualBreakdownByMonthController.updateRecord(body);
      // if (forecastedRowsAffected > 0) {
      //   // Success: Rows were updated
      //   combinedData = updatedBody; // Return the updated body
      // } else {
      //   // No rows were updated, handle accordingly
      //   return res.status(404).json({ error: "No records were updated." });
      // }
    }
    return res.json(combinedData);

    // if(resourceCostBreakdown){
  } catch (error) {
    ('forecasted Error',error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sumOfMonthToActualResources,
  sumOfMonthToForecastedResources,
};
