const { Soap } = require("@pedroentringer/custom-soap");
const { json2xml } = require("@pedroentringer/json2xml");

module.exports = {
  sendSimetrias: async (document) => {
    const soap = new Soap({
      soap12: true,
      // url: "http://187.75.229.91:8091/wscte/Service_CTE.asmx?wsdl",
      url: document.url,
      agentOptions: {
        rejectUnauthorized: false,
      },
      envelopeAttrs: {
        "xmlns:ns": "http://simetrias.com.br/webservices/wscte/1.0",
      },
      requestHeaders: {
        SOAPAction:
          "http://simetrias.com.br/webservices/wscte/1.0/ReceberConhecimentos",
      },
    });

    let json = {
      "ns:ReceberConhecimentos": {
        "ns:xml": {
          CTE: document.xml,
        },
      },
    };

    const soapObject = {
      "soap12:Envelope": {
        attrs: {
          "xmlns:soap12": "http://www.w3.org/2003/05/soap-envelope",
          ...soap.defaultEnvelopeAttrs,
          ...soap.envelopeAttrs,
        },
        value: {
          "soap12:Header": {},
          "soap12:Body": json,
        },
      },
    };


    const response = await soap.soapRequest({}, json);

    const { ReceberConhecimentosResponse } = response.json;


    if (!ReceberConhecimentosResponse) {
      return;
    }

    const { ReceberConhecimentosResult } = ReceberConhecimentosResponse;

    const { Codigo, Descricao } = ReceberConhecimentosResult.CTE.viagem;

    return { description: Descricao, code: Codigo }
  },
};
