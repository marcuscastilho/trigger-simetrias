const moment = require("moment");
const { getEvent } = require("./getEvent");
const { getType } = require("./getType");
const { isDdr } = require("./isDdr");
const { getModel } = require("./getModal");
const { isUrban } = require("./isUrban");
const { isRcfdc } = require("./isRcfdc");

module.exports = {
  dataMontage: (assure) => {
    try {
      const data = {
        codigo_fornecedor: 8,
        tipo_operacao: getEvent(assure),
        tipo_documento: getType(assure),
        cnpj_cliente: assure.emitente,
        codigo_ramo: assure.ramo,
        numero_caixa_postal: "",
        serie_documento: assure.serie,
        numero_conhecimento: assure.chave,
        data_emissao_documento: moment(new Date(assure.data_emissao)).format(
          "DD/MM/YYYY"
        ),
        data_saida_documento: moment(new Date(assure.data_emissao)).format(
          "DD/MM/YYYY"
        ),
        indicativo_ddr: isDdr(assure),
        tipo_transporte: getModel(assure),
        sigla_uf_origem: assure.uf_origem,
        codigo_cidade_origem: assure.ibge_origem,
        sigla_uf_destino: assure.uf_destino,
        codigo_cidade_destino: assure.ibge_destino,
        codigo_pais: "",
        indicativo_urbano: isUrban(assure),
        valor_segurado: String(assure.valor_mercadoria).replace(".", ","),
        valor_segurado_container: assure.valor_container,
        valor_segurado_frete: "",
        valor_segurado_despesa: "",
        valor_segurado_lucros: "",
        valor_segurado_impostos: "",
        identificacao_veiculo: "",
        indicativo_cobertura_rcfdc: isRcfdc(assure),
        tipo_mercadoria: "G",
        indicativo_operacao_ocd: "N",
        indicativo_operacao_lancamento: "N",
        indicativo_operacao_movimentacao: "N",
        indicativo_operacao_transbordo: "N",
        filial: "",
        apolice: 0,
        subgrupo: 0,
        cnpj_embarcador: assure.remetente
          ? assure.remetente.padStart(14, "0")
          : null,
        data_comunicacao_embarque: moment(
          new Date(assure.data_embarque)
        ).format("DD/MM/YYYY HH:mm:ss"),
        indicativo_operacao_rctrvi: "",
        veiculo_proprio: "",
        observacoes: assure.observacoes || "",
        indicativo_operacao_avarias: "",
        codigo_modelo_documento: "",
        identificacao_estabelecimento_tomador: "",
        identificacao_email: "",
        desconto_nota_fiscal_valor: "",
        complemento_origem: "",
        complemento_destino: "",
        numero_documento: assure.numero_documento,
        numero_averbacao_oficial: "",
        numero_manifesto:
          getType(assure) === "M" ? assure.numero_documento : "",
        descricao_chancela_extrator: "",
        indicativo_contingencia: "",
        cnpj_ddr: assure.cnpj_ddr,
        cnpj_emissor: assure.emitente,
      };

      let xml = {
        viagem: {
          A: data.codigo_fornecedor,
          B: data.tipo_operacao,
          C: data.tipo_documento,
          D: data.cnpj_cliente,
          E: data.codigo_ramo,
          F: data.numero_caixa_postal,
          G: data.serie_documento,
          H: data.numero_conhecimento,
          I: data.data_emissao_documento,
          J: data.data_saida_documento,
          K: data.indicativo_ddr,
          L: data.tipo_transporte,
          M: data.sigla_uf_origem,
          N: data.codigo_cidade_origem,
          O: data.sigla_uf_destino,
          P: data.codigo_cidade_destino,
          Q: data.codigo_pais,
          R: data.indicativo_urbano,
          S: data.valor_segurado,
          T: data.valor_segurado_container,
          U: data.valor_segurado_frete,
          V: data.valor_segurado_despesa,
          W: data.valor_segurado_lucros,
          Z: data.valor_segurado_impostos,
          AA: data.identificacao_veiculo,
          AB: data.indicativo_cobertura_rcfdc,
          AC: data.tipo_mercadoria,
          AD: data.indicativo_operacao_ocd,
          AE: data.indicativo_operacao_lancamento,
          AF: data.indicativo_operacao_movimentacao,
          AG: data.indicativo_operacao_transbordo,
          AH: data.filial,
          AI: data.apolice,
          AJ: data.subgrupo,
          AK: data.cnpj_embarcador,
          AL: data.data_emissao_documento,
          AM: data.indicativo_operacao_rctrvi,
          AN: data.veiculo_proprio,
          AO: data.observacoes,
          AP: data.indicativo_operacao_avarias,
          AQ: data.codigo_modelo_documento,
          AR: data.identificacao_estabelecimento_tomador,
          AS: data.identificacao_email,
          AT: data.desconto_nota_fiscal_valor,
          AU: data.complemento_origem,
          AV: data.complemento_destino,
          AW: data.numero_documento,
          AX: data.numero_averbacao_oficial,
          AZ: data.numero_manifesto,
          BA: data.descricao_chancela_extrator,
          BB: data.indicativo_contingencia,
          BC: data.cnpj_ddr,
          BC: data.cnpj_emissor,
        },
      };

      const document = {
        id: assure.id,
        url: assure.url_simetrias,
        xml,
      };

      return document;
    } catch (err) {
      console.log(err);
      throw new Error("Não foi possível montar os dados para envio");
    }
  },
};
