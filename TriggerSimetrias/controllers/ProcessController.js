const moment = require("moment");
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
          "$Smartbox->InsuranceCompany.envio_habilitado$": true,
          "$Smartbox.ambiente$": "producao",
        },
      });

      console.log("quantidade de averbações", averbations.length);

      
      for (const averbation of averbations) {
        try {
          if (
            averbation.document_type == "mdfe" &&
            averbation.Smartbox.InsuranceCompany.cnpj == "33.164.021/0001-00"
          ) {
            throw new Error('não enviar mdfe para a Tokio')
          }

          if(moment(averbation.averbation_date).format('YYYY-MM-DD') < averbation.Smartbox.production_date){
            throw new Error('data de averbação é menor que a data de liberado para produção')
          }

          const worked_data = dataMontage(averbation);

          const { description, code } = await sendSimetrias(worked_data);

          if (!description || !code) {
            continue;
          }

          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: code,
              log_insurance_system: description,
              send_insurance_system_date: moment().format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        } catch (err) {
          await Averbations.update(
            {
              send_insurance_system: 1,
              log_insurance_system: err.message,
              send_insurance_system_date: moment().format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        }
      }

      console.log("acabou");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ProcessController };
