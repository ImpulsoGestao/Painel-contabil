const LOCAL_BACKUP_KEY = "fechamento_contabil_v8_backup";
const PIN_SESSION_KEY = "fechamento_contabil_pin_ok";
const FIRESTORE_COLLECTION = "paineis_contabilidade";
const FIRESTORE_DOC_ID = "fechamento_mensal_equipe";

// Calendário de Novembro/2026 até Dezembro/2028 (26 meses)
const COMPETENCIAS = [
  "Outubro / 2026",
  "Novembro / 2026",
  "Dezembro / 2026",
  "Janeiro / 2027",
  "Fevereiro / 2027",
  "Março / 2027",
  "Abril / 2027",
  "Maio / 2027",
  "Junho / 2027",
  "Julho / 2027",
  "Agosto / 2027",
  "Setembro / 2027",
  "Outubro / 2027",
  "Novembro / 2027",
  "Dezembro / 2027",
  "Janeiro / 2028",
  "Fevereiro / 2028",
  "Março / 2028",
  "Abril / 2028",
  "Maio / 2028",
  "Junho / 2028",
  "Julho / 2028",
  "Agosto / 2028",
  "Setembro / 2028",
  "Outubro / 2028",
  "Novembro / 2028",
  "Dezembro / 2028"
];

// Áreas Contábeis padrão (editáveis, criáveis e excluíveis)
const DEFAULT_AREAS = [
  "Fiscal & Tributário",
  "Financeiro & Bancos",
  "Patrimonial & Custos",
  "Receitas & Faturamento",
  "Pessoal & Provisões"
];

// Modelo padrão das 32 tarefas
const BASE_TASKS_TEMPLATE = [
  { id: 1, name: "Pré-lançamentos (entradas e Saídas)", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 2, name: "Apuração SPED", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 3, name: "Reclassificação da Receita de Verbas", area: "Receitas & Faturamento", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 4, name: "Lançamento de Custos", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 5, name: "Análise de Benfeitoria e lançamento de Amortização", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 6, name: "Imobilizado e Depreciação", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 7, name: "Folha", area: "Pessoal & Provisões", status: "nao_iniciado", owner: "DP / Contabilidade", subfolders: [] },
  { id: 8, name: "Contabilização", area: "Pessoal & Provisões", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 9, name: "Contabilizar os Juros e Amortização Arrendamento", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 10, name: "Empréstimo", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Financeiro", subfolders: [] },
  { id: 11, name: "Parcelamento", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 12, name: "Composição Faturamento Mensal", area: "Receitas & Faturamento", status: "nao_iniciado", owner: "Faturamento", subfolders: [] },
  { id: 13, name: "Fundo Fixo", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Financeiro", subfolders: [] },
  { id: 14, name: "CTE", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 15, name: "Caixa Geral", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "ML", subfolders: [] },
  { id: 16, name: "Importação", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 17, name: "Conciliação ISS", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 18, name: "Adiantamentos", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "ML", subfolders: [] },
  { id: 19, name: "Bancos", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 20, name: "Aplicações Financeiras", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Financeiro", subfolders: [] },
  { id: 21, name: "Pré-lançamento (Financeiro)", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Financeiro", subfolders: [] },
  { id: 22, name: "Fornecedores", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 23, name: "Clientes", area: "Receitas & Faturamento", status: "nao_iniciado", owner: "ML", subfolders: [] },
  { id: 24, name: "Diferença de D x C", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 25, name: "Provisão de Contingências", area: "Pessoal & Provisões", status: "nao_iniciado", owner: "Jurídico / Contab.", subfolders: [] },
  { id: 26, name: "Receita de Frete", area: "Receitas & Faturamento", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 27, name: "FINIMP", area: "Financeiro & Bancos", status: "nao_iniciado", owner: "Financeiro", subfolders: [] },
  { id: 28, name: "Reclassificação de Aluguel", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "ML", subfolders: [] },
  { id: 29, name: "Provisão de Aluguel a receber", area: "Receitas & Faturamento", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 30, name: "PIS E COFINS", area: "Fiscal & Tributário", status: "nao_iniciado", owner: "Fiscal", subfolders: [] },
  { id: 31, name: "SEGUROS", area: "Patrimonial & Custos", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] },
  { id: 32, name: "Provisões fornecedores", area: "Pessoal & Provisões", status: "nao_iniciado", owner: "Contabilidade", subfolders: [] }
];

// Lista dos 6 relatórios pendentes
const BASE_REPORTS_TEMPLATE = [
  { id: 101, title: "Verbas", dept: "Geral", due: "A definir", status: "pendente", subfolders: [] },
  { id: 102, title: "FINIMP", dept: "Financeiro", due: "A definir", status: "pendente", subfolders: [] },
  { id: 103, title: "Relatório de PA", dept: "Financeiro", due: "A definir", status: "pendente", subfolders: [] },
  { id: 104, title: "Relatório de Importação", dept: "Fiscal", due: "A definir", status: "pendente", subfolders: [] },
  { id: 105, title: "CUSTO", dept: "Controladoria", due: "A definir", status: "pendente", subfolders: [] },
  { id: 106, title: "Folha", dept: "Departamento Pessoal", due: "A definir", status: "pendente", subfolders: [] }
];

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function createInitialState() {
  const monthsData = {};
  COMPETENCIAS.forEach(comp => {
    monthsData[comp] = {
      tasks: clone(BASE_TASKS_TEMPLATE),
      reports: clone(BASE_REPORTS_TEMPLATE)
    };
  });

  return {
    areas: clone(DEFAULT_AREAS),
    months: monthsData
  };
}

// A competência selecionada na tela fica individual por usuário (para 2 pessoas olharem meses diferentes sem conflito)
let currentCompetencia = COMPETENCIAS[0];
let state = loadLocalBackup();
let expandedTaskIds = new Set();
let expandedReportIds = new Set();

let db = null;
let docRef = null;
let isFirebaseReady = false;
let isSavingToCloud = false;

function normalizeState(raw) {
  const base = createInitialState();
  if (!raw || typeof raw !== "object") return base;

  const areas = (Array.isArray(raw.areas) && raw.areas.length > 0) ? raw.areas : base.areas;
  const months = raw.months && typeof raw.months === "object" ? raw.months : {};

  COMPETENCIAS.forEach(comp => {
    if (!months[comp]) {
      months[comp] = {
        tasks: clone(BASE_TASKS_TEMPLATE),
        reports: clone(BASE_REPORTS_TEMPLATE)
      };
    } else {
      if (!Array.isArray(months[comp].tasks)) months[comp].tasks = clone(BASE_TASKS_TEMPLATE);
      if (!Array.isArray(months[comp].reports)) months[comp].reports = clone(BASE_REPORTS_TEMPLATE);
      months[comp].tasks.forEach(t => { if (!Array.isArray(t.subfolders)) t.subfolders = []; });
      months[comp].reports.forEach(r => { if (!Array.isArray(r.subfolders)) r.subfolders = []; });
    }
  });

  return { areas, months };
}

function loadLocalBackup() {
  try {
    const saved = localStorage.getItem(LOCAL_BACKUP_KEY) ||
                  localStorage.getItem("fechamento_contabil_v7") ||
                  localStorage.getItem("fechamento_contabil_v6");
    if (saved) {
      return normalizeState(JSON.parse(saved));
    }
  } catch (e) {}
  return createInitialState();
}

function updateSyncBadge(mode, text) {
  const badge = document.getElementById("syncBadge");
  const label = document.getElementById("syncText");
  badge.className = "sync-badge " + mode;
  label.textContent = text;
}

// ==========================================
// INICIALIZAÇÃO DO FIREBASE (TEMPO REAL)
// ==========================================
function initFirebaseRealtime() {
  const hasConfig = typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG.apiKey &&
    !FIREBASE_CONFIG.apiKey.includes("COLE_SUA_API_KEY");

  if (!hasConfig || typeof firebase === "undefined") {
    document.getElementById("firebaseSetupBanner").style.display = "block";
    updateSyncBadge("local", "Modo Local");
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.firestore();
    docRef = db.collection(FIRESTORE_COLLECTION).doc(FIRESTORE_DOC_ID);
    isFirebaseReady = true;

    updateSyncBadge("connecting", "Sincronizando...");

    // Escuta em tempo real: qualquer mudança feita por outro assistente atualiza a tela imediatamente
    docRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const cloudData = snapshot.data();
        state = normalizeState(cloudData);
        localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(state));
        renderAll();
      } else {
        // Primeira vez que o banco é acessado: grava a estrutura inicial na nuvem
        docRef.set(state).catch(err => console.error("Erro ao criar documento inicial:", err));
      }
      updateSyncBadge("online", "Ao Vivo • Nuvem");
    }, (error) => {
      console.error("Erro na escuta do Firebase:", error);
      updateSyncBadge("local", "Offline (Backup Local)");
      showToast("⚠️ Falha na conexão com o Firebase. Verifique as regras do Firestore.");
    });

  } catch (err) {
    console.error("Erro ao iniciar Firebase:", err);
    updateSyncBadge("local", "Erro Config Firebase");
  }
}

function getActiveMonthData() {
  return state.months[currentCompetencia];
}

function saveState() {
  // Atualiza a tela e o backup local instantaneamente
  localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(state));
  renderAll();

  // Envia para o Firebase Firestore para refletir para os outros 4 assistentes e o gestor
  if (isFirebaseReady && docRef) {
    updateSyncBadge("connecting", "Salvando...");
    docRef.set({
      areas: state.areas,
      months: state.months,
      updatedAt: new Date().toISOString()
    }).then(() => {
      updateSyncBadge("online", "Ao Vivo • Nuvem");
    }).catch((err) => {
      console.error("Erro ao salvar no Firebase:", err);
      updateSyncBadge("local", "Erro ao Salvar");
      showToast("⚠️ Não foi possível salvar na nuvem. Verifique sua internet.");
    });
  }
}

// ==========================================
// CONTROLE DE PIN DA EQUIPE
// ==========================================
function initTeamPin() {
  const requiredPin = (typeof TEAM_ACCESS_PIN !== "undefined") ? String(TEAM_ACCESS_PIN).trim() : "";
  if (!requiredPin) return;

  if (sessionStorage.getItem(PIN_SESSION_KEY) === requiredPin) {
    return;
  }

  document.getElementById("pinOverlay").classList.add("active");
  setTimeout(() => document.getElementById("pinInput").focus(), 100);
}

function checkTeamPin() {
  const requiredPin = String(TEAM_ACCESS_PIN).trim();
  const entered = document.getElementById("pinInput").value.trim();
  const errorEl = document.getElementById("pinErrorMsg");

  if (entered === requiredPin) {
    sessionStorage.setItem(PIN_SESSION_KEY, requiredPin);
    document.getElementById("pinOverlay").classList.remove("active");
    errorEl.textContent = "";
  } else {
    errorEl.textContent = "PIN incorreto. Tente novamente.";
    document.getElementById("pinInput").value = "";
    document.getElementById("pinInput").focus();
  }
}

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3000);
}

function populateAreaSelects() {
  const areas = state.areas;

  const filterSel = document.getElementById("filterAreaSelect");
  const prevFilter = filterSel.value || "ALL";
  filterSel.innerHTML = `<option value="ALL">Todas as Áreas</option>` +
    areas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");
  filterSel.value = (prevFilter === "ALL" || areas.includes(prevFilter)) ? prevFilter : "ALL";

  const newSel = document.getElementById("newTaskArea");
  const prevNew = newSel.value;
  newSel.innerHTML = areas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");
  if (areas.includes(prevNew)) newSel.value = prevNew;

  const editSel = document.getElementById("editTaskArea");
  const prevEdit = editSel.value;
  editSel.innerHTML = areas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");
  if (areas.includes(prevEdit)) editSel.value = prevEdit;
}

function initCompetenciaSelect() {
  const sel = document.getElementById("competenciaSelect");
  sel.innerHTML = COMPETENCIAS.map(c => `<option value="${c}">${c}</option>`).join("");
  sel.value = currentCompetencia;
  sel.addEventListener("change", function () {
    currentCompetencia = this.value;
    expandedTaskIds.clear();
    expandedReportIds.clear();
    renderAll();
    showToast(`Visualizando competência: ${this.value}`);
  });
}

function switchTab(tabName, btnEl) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("view-" + tabName).classList.add("active");
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add("active");
  }
}

function goToFilteredTasks(statusFilter) {
  document.getElementById("filterStatusSelect").value = statusFilter;
  switchTab("atividades");
  renderTasks();
}

// ==========================================
// DASHBOARD EXECUTIVO
// ==========================================
function renderDashboard() {
  const { tasks } = getActiveMonthData();
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "concluido").length;
  const progress = tasks.filter(t => t.status === "andamento").length;
  const pending = tasks.filter(t => t.status === "pendente").length;
  const notStarted = tasks.filter(t => t.status === "nao_iniciado").length;

  const pctDone = total ? Math.round((done / total) * 100) : 0;
  const pctProgress = total ? Math.round((progress / total) * 100) : 0;
  const pctPending = total ? Math.round((pending / total) * 100) : 0;
  const pctNotStarted = total ? Math.max(0, 100 - pctDone - pctProgress - pctPending) : 0;

  document.getElementById("kpiCompLabel").textContent = currentCompetencia;
  document.getElementById("kpiPercent").textContent = pctDone + "%";
  document.getElementById("kpiPercentSub").textContent = `${done} de ${total} atividades concluídas`;
  document.getElementById("kpiDone").textContent = done;
  document.getElementById("kpiDonePct").textContent = `${pctDone}% do cronograma`;
  document.getElementById("kpiProgress").textContent = progress;
  document.getElementById("kpiProgressPct").textContent = `${pctProgress}% em execução`;
  document.getElementById("kpiPending").textContent = pending;
  document.getElementById("kpiPendingSub").textContent = `${notStarted} ainda não iniciadas`;

  document.getElementById("progressRatioText").textContent = `${done}/${total} concluídas (${pctDone}%)`;
  document.getElementById("segDone").style.width = (total ? (done / total) * 100 : 0) + "%";
  document.getElementById("segProgress").style.width = (total ? (progress / total) * 100 : 0) + "%";
  document.getElementById("segPending").style.width = (total ? (pending / total) * 100 : 0) + "%";
  document.getElementById("segNotStarted").style.width = (total ? (notStarted / total) * 100 : 0) + "%";

  // Donut SVG
  document.getElementById("donutCenterPct").textContent = pctDone + "%";
  const segments = [
    { label: "Concluído", count: done, pct: pctDone, color: "#059669" },
    { label: "Em Andamento", count: progress, pct: pctProgress, color: "#d97706" },
    { label: "Pendente", count: pending, pct: pctPending, color: "#dc2626" },
    { label: "Não Iniciado", count: notStarted, pct: pctNotStarted, color: "#94a3b8" }
  ];

  let offset = 0;
  let circlesHtml = `<circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e2e8f0" stroke-width="3.6"></circle>`;
  segments.forEach(seg => {
    if (seg.count > 0 && total > 0) {
      const val = (seg.count / total) * 100;
      circlesHtml += `<circle cx="18" cy="18" r="15.915" fill="transparent" stroke="${seg.color}" stroke-width="3.8" stroke-dasharray="${val} ${100 - val}" stroke-dashoffset="-${offset}"></circle>`;
      offset += val;
    }
  });
  document.getElementById("donutChart").innerHTML = circlesHtml;

  document.getElementById("donutBreakdown").innerHTML = segments.map(s => `
    <div class="donut-row">
      <span style="display:flex; align-items:center; gap:8px;">
        <span class="dot" style="background:${s.color};"></span> ${s.label}
      </span>
      <strong style="font-variant-numeric: tabular-nums;">${s.count} (${s.pct}%)</strong>
    </div>
  `).join("");

  // Barras por Área Contábil
  document.getElementById("areaBarsContainer").innerHTML = state.areas.map((area, idx) => {
    const list = tasks.filter(t => t.area === area);
    const areaDone = list.filter(t => t.status === "concluido").length;
    const areaPct = list.length ? Math.round((areaDone / list.length) * 100) : 0;
    const canDelete = state.areas.length > 1;
    return `
      <div class="area-bar-item">
        <div class="area-bar-top">
          <span class="area-title-group">
            <span class="area-title-editable" onclick="openEditAreaModal(${idx})" title="Clique para renomear esta área contábil">
              ${escapeHtml(area)}
            </span>
            <button class="area-action-btn area-edit-btn" onclick="openEditAreaModal(${idx})" title="Editar nome da área">✏️</button>
            ${canDelete ? `<button class="area-action-btn area-del-btn" onclick="openDeleteAreaModal(${idx})" title="Excluir área contábil">🗑</button>` : ""}
          </span>
          <span class="area-stats-pill">${areaDone}/${list.length} (${areaPct}%)</span>
        </div>
        <div class="area-bar-bg">
          <div class="area-bar-fill" style="width: ${areaPct}%; background: ${areaPct === 100 ? 'var(--emerald)' : 'var(--primary)'};"></div>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================
// GESTÃO DE ÁREAS CONTÁBEIS
// ==========================================
function openNewAreaModal() {
  document.getElementById("newAreaNameInput").value = "";
  document.getElementById("newAreaModal").classList.add("open");
  document.getElementById("newAreaNameInput").focus();
}

function closeNewAreaModal() {
  document.getElementById("newAreaModal").classList.remove("open");
}

function saveNewArea() {
  const name = document.getElementById("newAreaNameInput").value.trim();
  if (!name) return showToast("Informe o nome da nova área contábil.");
  if (state.areas.some(a => a.toLowerCase() === name.toLowerCase())) {
    return showToast("Já existe uma área contábil com esse nome.");
  }

  state.areas.push(name);
  closeNewAreaModal();
  saveState();
  showToast(`Área "${name}" adicionada com sucesso!`);
}

function openEditAreaModal(areaIndex) {
  const currentName = state.areas[areaIndex];
  if (!currentName) return;

  document.getElementById("editAreaIndex").value = areaIndex;
  document.getElementById("editAreaNameInput").value = currentName;
  document.getElementById("editAreaModal").classList.add("open");
  document.getElementById("editAreaNameInput").focus();
}

function closeEditAreaModal() {
  document.getElementById("editAreaModal").classList.remove("open");
}

function saveEditedArea() {
  const idx = Number(document.getElementById("editAreaIndex").value);
  const newName = document.getElementById("editAreaNameInput").value.trim();
  const oldName = state.areas[idx];

  if (!newName) return showToast("O nome da área contábil não pode ficar vazio.");
  if (newName === oldName) {
    closeEditAreaModal();
    return;
  }
  if (state.areas.some((a, i) => i !== idx && a.toLowerCase() === newName.toLowerCase())) {
    return showToast("Já existe uma área contábil com esse nome.");
  }

  state.areas[idx] = newName;

  COMPETENCIAS.forEach(comp => {
    state.months[comp].tasks.forEach(t => {
      if (t.area === oldName) {
        t.area = newName;
      }
    });
  });

  closeEditAreaModal();
  saveState();
  showToast(`Área "${oldName}" renomeada para "${newName}"!`);
}

function openDeleteAreaModal(areaIndex) {
  if (state.areas.length <= 1) {
    return showToast("É necessário manter pelo menos uma área contábil cadastrada.");
  }

  const areaName = state.areas[areaIndex];
  if (!areaName) return;

  const { tasks } = getActiveMonthData();
  const linkedTasks = tasks.filter(t => t.area === areaName);

  document.getElementById("deleteAreaIndex").value = areaIndex;
  document.getElementById("deleteAreaNameLabel").textContent = areaName;

  const reassignGroup = document.getElementById("deleteAreaReassignGroup");
  const targetSelect = document.getElementById("deleteAreaTargetSelect");
  const remainingAreas = state.areas.filter((_, i) => i !== areaIndex);

  if (linkedTasks.length > 0) {
    reassignGroup.style.display = "block";
    document.getElementById("deleteAreaTaskCount").textContent = linkedTasks.length;
    targetSelect.innerHTML = remainingAreas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");
  } else {
    reassignGroup.style.display = "none";
    targetSelect.innerHTML = `<option value="${escapeHtml(remainingAreas[0])}">${escapeHtml(remainingAreas[0])}</option>`;
  }

  document.getElementById("deleteAreaModal").classList.add("open");
}

function closeDeleteAreaModal() {
  document.getElementById("deleteAreaModal").classList.remove("open");
}

function confirmDeleteArea() {
  const idx = Number(document.getElementById("deleteAreaIndex").value);
  const areaToDelete = state.areas[idx];
  if (!areaToDelete) return;

  const fallbackArea = document.getElementById("deleteAreaTargetSelect").value ||
    state.areas.find((_, i) => i !== idx);

  state.areas.splice(idx, 1);

  COMPETENCIAS.forEach(comp => {
    state.months[comp].tasks.forEach(t => {
      if (t.area === areaToDelete && fallbackArea) {
        t.area = fallbackArea;
      }
    });
  });

  closeDeleteAreaModal();
  saveState();
  showToast(`Área "${areaToDelete}" excluída com sucesso!`);
}

// ==========================================
// LISTA DE ATIVIDADES
// ==========================================
function renderTasks() {
  const { tasks } = getActiveMonthData();
  const query = document.getElementById("searchTaskInput").value.toLowerCase().trim();
  const statusFilter = document.getElementById("filterStatusSelect").value;
  const areaFilter = document.getElementById("filterAreaSelect").value;

  const filtered = tasks.filter(t => {
    const matchQuery = !query ||
      t.name.toLowerCase().includes(query) ||
      (t.owner && t.owner.toLowerCase().includes(query)) ||
      (t.area && t.area.toLowerCase().includes(query)) ||
      t.subfolders.some(s => s.name.toLowerCase().includes(query));
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchArea = areaFilter === "ALL" || t.area === areaFilter;
    return matchQuery && matchStatus && matchArea;
  });

  document.getElementById("tabCountAtividades").textContent = tasks.length;

  const container = document.getElementById("tasksListContainer");
  if (filtered.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; color:var(--text-muted);">Nenhuma atividade encontrada com os filtros atuais.</div>`;
    return;
  }

  container.innerHTML = filtered.map((task, idx) => {
    const displayNum = idx + 1;
    const isDone = task.status === "concluido";
    const isExpanded = expandedTaskIds.has(task.id);
    const subDone = task.subfolders.filter(s => s.status === "concluido").length;

    return `
      <div class="task-card status-${task.status}">
        <div class="task-row">
          <div class="task-left">
            <span class="task-num">${displayNum}</span>
            <button class="task-check ${isDone ? 'checked' : ''}" onclick="toggleTaskDone(${task.id})" title="Marcar/Desmarcar conclusão">
              ${isDone ? "✓" : ""}
            </button>
            <div>
              <div class="task-title ${isDone ? 'done' : ''}" onclick="openEditTaskModal(${task.id})" title="Clique para editar título, responsável ou área">
                ${escapeHtml(task.name)}
              </div>
              <div class="task-meta">
                <span class="tag-area">${escapeHtml(task.area)}</span>
                <span class="tag-owner" onclick="openEditTaskModal(${task.id})" title="Clique para alterar o responsável">
                  👤 ${escapeHtml(task.owner || "Definir responsável")}
                </span>
                ${task.subfolders.length > 0 ? `<span class="tag-sub" onclick="toggleExpandTask(${task.id})">📂 ${subDone}/${task.subfolders.length} subpastas</span>` : ""}
              </div>
            </div>
          </div>

          <div class="task-right">
            <button class="btn btn-icon-edit" onclick="openEditTaskModal(${task.id})" title="Editar título, responsável ou área">
              ✏️ Editar
            </button>
            <select class="status-select" onchange="changeTaskStatus(${task.id}, this.value)">
              <option value="nao_iniciado" ${task.status === "nao_iniciado" ? "selected" : ""}>Não Iniciado</option>
              <option value="andamento" ${task.status === "andamento" ? "selected" : ""}>Em Andamento</option>
              <option value="pendente" ${task.status === "pendente" ? "selected" : ""}>Pendente</option>
              <option value="concluido" ${task.status === "concluido" ? "selected" : ""}>Concluído</option>
            </select>
            <button class="btn btn-sm" onclick="toggleExpandTask(${task.id})">
              ${isExpanded ? "▲ Fechar" : "+ Subpasta"}
            </button>
            <button class="btn btn-icon-del" onclick="openDeleteTaskModal(${task.id})" title="Excluir atividade deste mês e dos próximos">
              🗑
            </button>
          </div>
        </div>

        ${isExpanded ? `
          <div class="subfolders-box">
            <div class="subfolders-header">
              <span>📂 Subpastas / Detalhamento (${task.subfolders.length})</span>
            </div>
            ${task.subfolders.length === 0 ? `<p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">Nenhuma subpasta criada. Adicione abaixo (ex: Banco Itaú, Fornecedor X, Filial 02) — ela já aparecerá automaticamente nos próximos meses.</p>` : ""}
            ${task.subfolders.map(sub => `
              <div class="sub-item">
                <div style="display:flex; align-items:center; gap:8px;">
                  <button class="task-check ${sub.status === 'concluido' ? 'checked' : ''}" style="width:18px; height:18px; font-size:11px;" onclick="toggleSubfolderDone(${task.id}, ${sub.id})">
                    ${sub.status === "concluido" ? "✓" : ""}
                  </button>
                  <span style="${sub.status === 'concluido' ? 'text-decoration:line-through; color:var(--text-muted);' : 'font-weight:500;'}">${escapeHtml(sub.name)}</span>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <select class="select-input" style="padding:3px 8px; font-size:0.76rem;" onchange="changeSubfolderStatus(${task.id}, ${sub.id}, this.value)">
                    <option value="nao_iniciado" ${sub.status === "nao_iniciado" ? "selected" : ""}>Não Iniciado</option>
                    <option value="andamento" ${sub.status === "andamento" ? "selected" : ""}>Em Andamento</option>
                    <option value="pendente" ${sub.status === "pendente" ? "selected" : ""}>Pendente</option>
                    <option value="concluido" ${sub.status === "concluido" ? "selected" : ""}>Concluído</option>
                  </select>
                  <button class="btn btn-sm" style="color:var(--rose);" onclick="deleteSubfolder(${task.id}, ${sub.id})" title="Excluir subpasta">✕</button>
                </div>
              </div>
            `).join("")}

            <div class="sub-add-form">
              <input type="text" id="subInput-${task.id}" placeholder="Nome da subpasta (ex: Banco Santander, Fornecedor ABC...)" onkeydown="if(event.key==='Enter') addSubfolder(${task.id})" />
              <button class="btn btn-primary btn-sm" onclick="addSubfolder(${task.id})">+ Criar</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");
}

function openEditTaskModal(taskId) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === taskId);
  if (!t) return;

  populateAreaSelects();
  document.getElementById("editTaskId").value = t.id;
  document.getElementById("editTaskNumLabel").textContent = t.id;
  document.getElementById("editTaskName").value = t.name;
  document.getElementById("editTaskOwner").value = t.owner || "";
  document.getElementById("editTaskArea").value = t.area;

  document.getElementById("editTaskModal").classList.add("open");
  document.getElementById("editTaskName").focus();
}

function closeEditTaskModal() {
  document.getElementById("editTaskModal").classList.remove("open");
}

function saveEditedTask() {
  const taskId = Number(document.getElementById("editTaskId").value);
  const newName = document.getElementById("editTaskName").value.trim();
  const newOwner = document.getElementById("editTaskOwner").value.trim() || "Contabilidade";
  const newArea = document.getElementById("editTaskArea").value;

  if (!newName) return showToast("O título da tarefa não pode ficar vazio.");

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compName = COMPETENCIAS[i];
    const targetTask = state.months[compName].tasks.find(x => x.id === taskId);
    if (targetTask) {
      targetTask.name = newName;
      targetTask.owner = newOwner;
      targetTask.area = newArea;
    }
  }

  closeEditTaskModal();
  saveState();
  showToast("Atividade atualizada neste mês e nos próximos!");
}

function openDeleteTaskModal(taskId) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === taskId);
  if (!t) return;

  document.getElementById("deleteTaskId").value = t.id;
  document.getElementById("deleteTaskNumLabel").textContent = t.id;
  document.getElementById("deleteTaskNameLabel").textContent = t.name;
  document.getElementById("deleteTaskCompLabel").textContent = currentCompetencia;

  document.getElementById("deleteTaskModal").classList.add("open");
}

function closeDeleteTaskModal() {
  document.getElementById("deleteTaskModal").classList.remove("open");
}

function confirmDeleteTask() {
  const taskId = Number(document.getElementById("deleteTaskId").value);
  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compName = COMPETENCIAS[i];
    state.months[compName].tasks = state.months[compName].tasks.filter(x => x.id !== taskId);
  }

  expandedTaskIds.delete(taskId);
  closeDeleteTaskModal();
  saveState();
  showToast("Atividade excluída neste mês e nos meses seguintes!");
}

function toggleTaskDone(id) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.status = t.status === "concluido" ? "nao_iniciado" : "concluido";
  saveState();
}

function changeTaskStatus(id, newStatus) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.status = newStatus;
  saveState();
}

function toggleExpandTask(id) {
  if (expandedTaskIds.has(id)) expandedTaskIds.delete(id);
  else expandedTaskIds.add(id);
  renderTasks();
}

function addSubfolder(taskId) {
  const input = document.getElementById("subInput-" + taskId);
  const name = input.value.trim();
  if (!name) return;

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);
  const baseSubId = Date.now();

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compName = COMPETENCIAS[i];
    const targetTask = state.months[compName].tasks.find(x => x.id === taskId);
    if (targetTask) {
      targetTask.subfolders.push({
        id: baseSubId + i,
        name,
        status: "nao_iniciado"
      });
    }
  }

  expandedTaskIds.add(taskId);
  saveState();
  showToast(`Subpasta "${name}" criada e replicada para os próximos meses!`);
}

function toggleSubfolderDone(taskId, subId) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === taskId);
  const s = t.subfolders.find(x => x.id === subId);
  s.status = s.status === "concluido" ? "nao_iniciado" : "concluido";
  saveState();
}

function changeSubfolderStatus(taskId, subId, newStatus) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === taskId);
  const s = t.subfolders.find(x => x.id === subId);
  s.status = newStatus;
  saveState();
}

function deleteSubfolder(taskId, subId) {
  const { tasks } = getActiveMonthData();
  const t = tasks.find(x => x.id === taskId);
  const sub = t.subfolders.find(x => x.id === subId);
  const subName = sub ? sub.name : "";

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);
  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const targetTask = state.months[COMPETENCIAS[i]].tasks.find(x => x.id === taskId);
    if (targetTask) {
      if (i === currentIndex) {
        targetTask.subfolders = targetTask.subfolders.filter(x => x.id !== subId);
      } else if (subName) {
        targetTask.subfolders = targetTask.subfolders.filter(x => x.name !== subName);
      }
    }
  }
  saveState();
  showToast("Subpasta removida.");
}

// ==========================================
// ABA 3: RELATÓRIOS PENDENTES
// ==========================================
function renderReports() {
  const { reports } = getActiveMonthData();
  const openReports = reports.filter(r => r.status !== "concluido").length;
  document.getElementById("tabCountRelatorios").textContent = openReports;

  const container = document.getElementById("reportsListContainer");
  if (reports.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; color:var(--text-muted);">Nenhum relatório pendente registrado nesta competência.</div>`;
    return;
  }

  container.innerHTML = reports.map(rep => {
    const isDone = rep.status === "concluido";
    const isExpanded = expandedReportIds.has(rep.id);

    return `
      <div class="task-card status-${rep.status}">
        <div class="task-row">
          <div class="task-left">
            <button class="task-check ${isDone ? 'checked' : ''}" onclick="toggleReportDone(${rep.id})">
              ${isDone ? "✓" : ""}
            </button>
            <div>
              <div class="task-title ${isDone ? 'done' : ''}" onclick="openEditReportModal(${rep.id})" title="Clique para editar este relatório">
                ${escapeHtml(rep.title)}
              </div>
              <div class="task-meta">
                ${rep.dept ? `<span class="tag-dept" onclick="openEditReportModal(${rep.id})">Setor: ${escapeHtml(rep.dept)}</span>` : ""}
                ${rep.due ? `<span>📅 Prazo: <strong>${escapeHtml(rep.due)}</strong></span>` : ""}
                ${rep.subfolders.length > 0 ? `<span class="tag-sub" onclick="toggleExpandReport(${rep.id})">📂 ${rep.subfolders.length} itens</span>` : ""}
              </div>
            </div>
          </div>

          <div class="task-right">
            <button class="btn btn-icon-edit" onclick="openEditReportModal(${rep.id})" title="Editar relatório">
              ✏️ Editar
            </button>
            <select class="status-select" onchange="changeReportStatus(${rep.id}, this.value)">
              <option value="pendente" ${rep.status === "pendente" ? "selected" : ""}>Aguardando Envio</option>
              <option value="andamento" ${rep.status === "andamento" ? "selected" : ""}>Em Conferência</option>
              <option value="concluido" ${rep.status === "concluido" ? "selected" : ""}>Recebido / OK</option>
            </select>
            <button class="btn btn-sm" onclick="toggleExpandReport(${rep.id})">
              ${isExpanded ? "▲ Fechar" : "+ Subpasta"}
            </button>
            <button class="btn btn-icon-del" onclick="deleteReport(${rep.id})" title="Excluir relatório">🗑</button>
          </div>
        </div>

        ${isExpanded ? `
          <div class="subfolders-box">
            <div class="subfolders-header">
              <span>📂 Detalhamento do Relatório (${rep.subfolders.length})</span>
            </div>
            ${rep.subfolders.map(sub => `
              <div class="sub-item">
                <div style="display:flex; align-items:center; gap:8px;">
                  <button class="task-check ${sub.status === 'concluido' ? 'checked' : ''}" style="width:18px; height:18px; font-size:11px;" onclick="toggleReportSubDone(${rep.id}, ${sub.id})">
                    ${sub.status === "concluido" ? "✓" : ""}
                  </button>
                  <span style="${sub.status === 'concluido' ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${escapeHtml(sub.name)}</span>
                </div>
                <button class="btn btn-sm" style="color:var(--rose);" onclick="deleteReportSub(${rep.id}, ${sub.id})">✕</button>
              </div>
            `).join("")}
            <div class="sub-add-form">
              <input type="text" id="repSubInput-${rep.id}" placeholder="Adicionar item/unidade (ex: Filial Maceió, Banco Bradesco...)" onkeydown="if(event.key==='Enter') addReportSub(${rep.id})" />
              <button class="btn btn-primary btn-sm" onclick="addReportSub(${rep.id})">+ Criar</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");
}

function openEditReportModal(repId) {
  const { reports } = getActiveMonthData();
  const r = reports.find(x => x.id === repId);
  if (!r) return;

  document.getElementById("editReportId").value = r.id;
  document.getElementById("editReportTitle").value = r.title;
  document.getElementById("editReportDept").value = r.dept || "";
  document.getElementById("editReportDue").value = r.due || "";

  document.getElementById("editReportModal").classList.add("open");
  document.getElementById("editReportTitle").focus();
}

function closeEditReportModal() {
  document.getElementById("editReportModal").classList.remove("open");
}

function saveEditedReport() {
  const repId = Number(document.getElementById("editReportId").value);
  const newTitle = document.getElementById("editReportTitle").value.trim();
  const newDept = document.getElementById("editReportDept").value.trim() || "Geral";
  const newDue = document.getElementById("editReportDue").value.trim() || "A definir";

  if (!newTitle) return showToast("Informe o nome do relatório.");

  const { reports } = getActiveMonthData();
  const currentRep = reports.find(x => x.id === repId);
  if (!currentRep) return;

  const oldTitle = currentRep.title;
  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compReports = state.months[COMPETENCIAS[i]].reports;
    const targetRep = i === currentIndex
      ? currentRep
      : compReports.find(x => x.title === oldTitle);
    if (targetRep) {
      targetRep.title = newTitle;
      targetRep.dept = newDept;
      targetRep.due = newDue;
    }
  }

  closeEditReportModal();
  saveState();
  showToast("Relatório atualizado neste mês e nos próximos!");
}

function addReport() {
  const title = document.getElementById("repTitleInput").value.trim();
  if (!title) return showToast("Informe o nome do relatório.");
  const dept = document.getElementById("repDeptInput").value.trim() || "Geral";
  const due = document.getElementById("repDueInput").value.trim() || "A definir";

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);
  const baseId = Date.now();

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compName = COMPETENCIAS[i];
    state.months[compName].reports.unshift({
      id: baseId + i,
      title,
      dept,
      due,
      status: "pendente",
      subfolders: []
    });
  }

  document.getElementById("repTitleInput").value = "";
  document.getElementById("repDeptInput").value = "";
  document.getElementById("repDueInput").value = "";
  saveState();
  showToast("Relatório registrado no mês atual e nos meses posteriores!");
}

function toggleReportDone(id) {
  const { reports } = getActiveMonthData();
  const r = reports.find(x => x.id === id);
  r.status = r.status === "concluido" ? "pendente" : "concluido";
  saveState();
}

function changeReportStatus(id, val) {
  const { reports } = getActiveMonthData();
  const r = reports.find(x => x.id === id);
  r.status = val;
  saveState();
}

function deleteReport(id) {
  const monthData = getActiveMonthData();
  const target = monthData.reports.find(x => x.id === id);
  const titleToDelete = target ? target.title : "";

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);
  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compData = state.months[COMPETENCIAS[i]];
    if (i === currentIndex) {
      compData.reports = compData.reports.filter(x => x.id !== id);
    } else if (titleToDelete) {
      compData.reports = compData.reports.filter(x => x.title !== titleToDelete);
    }
  }
  saveState();
  showToast("Relatório excluído.");
}

function toggleExpandReport(id) {
  if (expandedReportIds.has(id)) expandedReportIds.delete(id);
  else expandedReportIds.add(id);
  renderReports();
}

function addReportSub(repId) {
  const input = document.getElementById("repSubInput-" + repId);
  const name = input.value.trim();
  if (!name) return;

  const { reports } = getActiveMonthData();
  const currentRep = reports.find(x => x.id === repId);
  if (!currentRep) return;

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);
  const baseSubId = Date.now();

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compReports = state.months[COMPETENCIAS[i]].reports;
    const targetRep = i === currentIndex
      ? currentRep
      : compReports.find(x => x.title === currentRep.title);
    if (targetRep) {
      targetRep.subfolders.push({
        id: baseSubId + i,
        name,
        status: "pendente"
      });
    }
  }

  expandedReportIds.add(repId);
  saveState();
  showToast("Subpasta adicionada ao relatório atual e aos meses seguintes!");
}

function toggleReportSubDone(repId, subId) {
  const { reports } = getActiveMonthData();
  const r = reports.find(x => x.id === repId);
  const s = r.subfolders.find(x => x.id === subId);
  s.status = s.status === "concluido" ? "pendente" : "concluido";
  saveState();
}

function deleteReportSub(repId, subId) {
  const { reports } = getActiveMonthData();
  const r = reports.find(x => x.id === repId);
  r.subfolders = r.subfolders.filter(x => x.id !== subId);
  saveState();
}

// ==========================================
// MODAL NOVA ATIVIDADE
// ==========================================
function openNewTaskModal() {
  populateAreaSelects();
  document.getElementById("newTaskModal").classList.add("open");
  document.getElementById("newTaskName").focus();
}

function closeNewTaskModal() {
  document.getElementById("newTaskModal").classList.remove("open");
}

function saveNewTask() {
  const name = document.getElementById("newTaskName").value.trim();
  if (!name) return showToast("Digite o nome da atividade.");
  const area = document.getElementById("newTaskArea").value;
  const owner = document.getElementById("newTaskOwner").value.trim() || "Contabilidade";

  const currentIndex = COMPETENCIAS.indexOf(currentCompetencia);

  let maxId = 0;
  for (let i = 0; i < COMPETENCIAS.length; i++) {
    const list = state.months[COMPETENCIAS[i]].tasks;
    list.forEach(t => { if (t.id > maxId) maxId = t.id; });
  }
  const nextId = maxId + 1;

  for (let i = currentIndex; i < COMPETENCIAS.length; i++) {
    const compName = COMPETENCIAS[i];
    state.months[compName].tasks.push({
      id: nextId,
      name,
      area,
      status: "nao_iniciado",
      owner,
      subfolders: []
    });
  }

  document.getElementById("newTaskName").value = "";
  document.getElementById("newTaskOwner").value = "";
  closeNewTaskModal();
  saveState();
  showToast(`Atividade adicionada em ${currentCompetencia} e nos meses seguintes!`);
}

function copyManagerSummary() {
  const { tasks, reports } = getActiveMonthData();
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "concluido").length;
  const progress = tasks.filter(t => t.status === "andamento").length;
  const pending = tasks.filter(t => t.status === "pendente").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const comp = currentCompetencia;

  const openReps = reports.filter(r => r.status !== "concluido");
  const repsText = openReps.length
    ? openReps.map(r => `• ${r.title} (${r.dept} - Prazo: ${r.due})`).join("\n")
    : "• Nenhum relatório pendente.";

  const summary = `📊 *STATUS DO FECHAMENTO CONTÁBIL — ${comp}*\n\n` +
    `✅ *Progresso Geral:* ${pct}% (${done} de ${total} atividades concluídas)\n` +
    `⏳ *Em Andamento:* ${progress}\n` +
    `⚠️ *Pendentes/Bloqueadas:* ${pending}\n\n` +
    `📁 *Relatórios Aguardando Entrega (${openReps.length}):*\n${repsText}`;

  navigator.clipboard.writeText(summary).then(() => {
    showToast("Resumo copiado! Cole no WhatsApp, Teams ou E-mail.");
  }).catch(() => {
    alert(summary);
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function renderAll() {
  document.getElementById("competenciaSelect").value = currentCompetencia;
  populateAreaSelects();
  renderDashboard();
  renderTasks();
  renderReports();
}

initTeamPin();
initCompetenciaSelect();
renderAll();
initFirebaseRealtime();
