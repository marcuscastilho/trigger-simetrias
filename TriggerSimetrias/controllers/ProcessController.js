const { BatchController } = require("../models/mysqldb/BatchController");
const { Averbations } = require("../models/mysqldb/Averbations");
const { InsuranceCompany } = require("../models/mysqldb/InsuranceCompany");
const { Smartboxes } = require("../models/mysqldb/Smartboxes");
const { dataMontage } = require("../utils/dataMontage");
const { sendSimetrias } = require("../utils/sendSimetrias");
const { Op } = require("sequelize");

class ProcessController {
  constructor() {}

  async main() {
    try {
      const { batch } = await BatchController.findOne();
      const averbations = await Averbations.findAll({
        include: [
          {
            model: Smartboxes,
            include: [
              {
                model: InsuranceCompany,
                where: {
                  active_send: true,
                },
              },
            ],
          },
        ],
        where: {
          send_insurance_system: false,
          is_pending: false,
          insurance_system: "simetrias",
          simetrias_anchor: {
            [Op.not]: null,
          },
        },
        limit: batch,
      });

      for (const averbation of averbations) {
        try {
          const worked_data = dataMontage(averbation);
          console.log("worked_data", worked_data);
          
          const { description, status_code } = await sendSimetrias(
            worked_data
          );

          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: status_code,
              log_insurance_system: description,
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        } catch (err) {
          console.log(err)
          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: "500",
              log_insurance_system: err.message,
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ProcessController };
