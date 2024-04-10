const { Op } = require("sequelize");
const { WTT_FinancialYear } = require("../../models/database2/wtt_financialYear")

exports.getAllFinacialYears =  async ()=>{
    return await WTT_FinancialYear.findAll();
}

exports.getFinacialYearId = async (startYear, endYear)=>{
    const date1 = new Date(); 
    date1.setDate(2); 
    date1.setMonth(3); 
    date1.setFullYear(startYear);
    const date2 = new Date(); 
    date2.setDate(30); 
    date2.setMonth(2); 
    date2.setFullYear(endYear);
    return await WTT_FinancialYear.findOne({
        where:{
           startDate:{
            [Op.gte]:date1
           },
           endDate:{
            [Op.lte]:date2
           }
        }
    })
}