// Exemplo: Tipo para um Projeto (simplificado por enquanto)
export interface Project {
    id: string;
    name: string;
    gerencia: string;
    status: 'Idea' | 'Development' | 'Completed' | 'On Hold';
    startDate: string; 
    endDate?: string; 
    description?: string; // Adicionado/Confirmado
  }
  // ... resto dos tipos
  
  
  // Exemplo: Tipo para Métricas do Dashboard
  export interface DashboardMetric {
    label: string;
    value: string | number;
    unit?: string;
  }
  
  