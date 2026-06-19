/* Flux — seed data (no backend). Used by js/store.js to seed localStorage
   on first load; afterwards the live state lives in localStorage. */

const FLUX_DATA = {
  profile: {
    name: "Bruno Nardelli",
    email: "Flux@gmail.com",
    role: "Analista de Banco de Dados",
  },

  templates: ["Gestão de Vendas (CRM)", "Desenvolvimento Ágil", "Produção"],

  // Each kanban is independent: own stages + cards. These are the examples
  // shown the first time the app runs.
  kanbans: [
    {
      id: "ti",
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
    {
      id: "producao",
      name: "Produção",
      stages: ["Demanda", "Teste", "Deploy", "Finalizado"],
      columns: {
        Demanda: [
          { title: "Ordem de produção lote 42", prazo: "08/09", status: "orange",
            para: "Carlos", detalhes: "Liberar matéria-prima do estoque" },
          { title: "Manutenção preventiva prensa 3", prazo: "14/09", status: "red",
            para: "Marcos", detalhes: "Troca de rolamento antes da falha" },
        ],
        Teste: [
          { title: "Controle de qualidade lote 41", prazo: "09/09", status: "orange",
            para: "Fernanda", detalhes: "Inspeção por amostragem" },
        ],
        Deploy: [
          { title: "Expedição lote 40", prazo: "10/09", status: "green",
            para: "Carlos", detalhes: "Carregar caminhão da transportadora" },
        ],
        Finalizado: [
          { title: "Calibrar balança industrial", prazo: "01/09", status: "green",
            para: "Marcos", detalhes: "Aferição mensal concluída" },
          { title: "Limpeza linha 2", prazo: "30/08", status: "green",
            para: "Fernanda", detalhes: "Sanitização do turno" },
        ],
      },
    },
    {
      id: "diadia",
      name: "Dia Dia",
      stages: ["Demanda", "Teste", "Deploy", "Finalizado"],
      columns: {
        Demanda: [
          { title: "Pagar contas do mês", prazo: "05/09", status: "red",
            para: "Eu", detalhes: "Luz, água e internet" },
          { title: "Comprar mantimentos", prazo: "06/09", status: "orange",
            para: "Eu", detalhes: "Lista da semana no mercado" },
        ],
        Teste: [
          { title: "Reunião 1:1 com gestor", prazo: "07/09", status: "orange",
            para: "Eu", detalhes: "Preparar pontos da quinzena" },
        ],
        Deploy: [
          { title: "Agendar dentista", prazo: "12/09", status: "green",
            para: "Eu", detalhes: "Limpeza semestral" },
        ],
        Finalizado: [
          { title: "Renovar CNH", prazo: "20/08", status: "green",
            para: "Eu", detalhes: "Documento já retirado" },
        ],
      },
    },
  ],
};
