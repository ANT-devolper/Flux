/* Flux — mocked data (no backend, no persistence). */

const FLUX_DATA = {
  profile: {
    name: "Bruno Nardelli",
    email: "Flux@gmail.com",
    role: "Analista de Banco de Dados",
  },

  myKanbans: ["Produção", "T.I", "Dia Dia"],

  templates: ["Gestão de Vendas (CRM)", "Desenvolvimento Ágil", "Produção"],

  // Board currently shown on the kanban / workflow screens.
  board: {
    name: "T.I",
    stages: ["Demanda", "Teste", "Deploy", "Finalizado"],
    columns: {
      Demanda: [
        { title: "Corrigir o botão de login", prazo: "10/09", status: "red",
          para: "Eduado", detalhes: "Ele não está sendo exibido na tela" },
        { title: "Investigar lentidão no BD", prazo: "11/09", status: "orange",
          para: "Bruno", detalhes: "Sistema está lento ao consultar o BD" },
        { title: "Atualizar API", prazo: "20/09", status: "green",
          para: "Eduado", detalhes: "Assim que liberarem" },
      ],
      Teste: [
        { title: "Validar a integração BD", prazo: "12/09", status: "orange",
          para: "Eduado", detalhes: "Alinhar com o Bruno" },
      ],
      Deploy: [
        { title: "Subir Patch v1.2", prazo: "15/09", status: "red",
          para: "Antonio", detalhes: "Patch de hotfix" },
      ],
      Finalizado: [
        { title: "Ajustar CSS", prazo: "09/09", status: "red",
          para: "Eduado", detalhes: "Para ficar reativo" },
        { title: "Configurar SSL", prazo: "27/08", status: "green",
          para: "Antonio", detalhes: "Para ficar de acordo com as alterações da última reunião" },
        { title: "Ajustar Header", prazo: "26/08", status: "red",
          para: "Bruno", detalhes: "Alterar para nova logo" },
      ],
    },
  },
};
