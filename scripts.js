/**
 * PROYECTO: Apuntes UAC
 * INTEGRANTES: Ramos, Pérez & Canal
 */

// Datos simulados (Modelos del Sistema)
const mockData = [
    { id: 1, title: 'Cálculo Stewart 7ma Ed.', cat: 'Libro', status: 'Disponible', user: 'Zidane R.', icon: 'fa-book' },
    { id: 2, title: 'Maqueta Estructuras II', cat: 'Maqueta', status: 'Reservado', user: 'Marcelo P.', icon: 'fa-layer-group' },
    { id: 3, title: 'Calculadora HP Prime', cat: 'Equipo', status: 'Disponible', user: 'Pabel C.', icon: 'fa-calculator' },
    { id: 4, title: 'Fotocopias Algoritmos', cat: 'Papel', status: 'Disponible', user: 'Admin FIA', icon: 'fa-file-lines' }
];

/**
 * Control de Vistas (Navegación)
 */
function showView(viewName) {
    const main = document.getElementById('main-content');
    
    // Cambiar estado visual de la barra de navegación
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`nav-${viewName}`);
    if(activeBtn) activeBtn.classList.add('active');

    // Limpiar pantalla principal
    main.innerHTML = '';

    // Crear contenedor animado
    const container = document.createElement('div');
    container.className = 'view-transition';

    // Inyectar HTML según la vista seleccionada
    if (viewName === 'home') {
        renderHome(container);
    } else if (viewName === 'create') {
        renderCreate(container);
    } else if (viewName === 'profile') {
        renderProfile(container);
    }

    main.appendChild(container);
}

/**
 * Pantalla de Catálogo (Lectura de datos)
 */
function renderHome(container) {
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-xl font-black text-slate-800 mb-4 tracking-tight">Material Disponible</h2>
            <div class="relative mb-4">
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" placeholder="¿Qué estás buscando?" class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-900 outline-none font-medium">
            </div>
        </div>
        <div id="recycler-view" class="space-y-4">
            ${mockData.map(item => `
                <div class="item-card flex gap-4">
                    <div class="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                        <i class="fas ${item.icon} text-slate-300 text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <span class="text-[9px] font-black bg-blue-50 text-blue-900 px-2 py-1 rounded-md uppercase tracking-wider">${item.cat}</span>
                            <span class="text-[9px] font-black ${item.status === 'Disponible' ? 'text-green-600' : 'text-amber-500'}">● ${item.status}</span>
                        </div>
                        <h3 class="font-bold text-slate-800 text-base mt-1">${item.title}</h3>
                        <p class="text-[10px] text-slate-400 font-medium">Por: ${item.user}</p>
                        <button class="mt-3 w-full bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-lg tracking-widest uppercase hover:bg-black transition-colors">Solicitar</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Pantalla de Donación (Creación de registros)
 */
function renderCreate(container) {
    container.innerHTML = `
        <h2 class="text-2xl font-black text-slate-800 mb-6">Donar Material</h2>
        <div class="bg-white p-6 rounded-[2rem] shadow-sm space-y-5 border border-white">
            <div onclick="triggerSuccess()" class="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-blue-50 transition-colors">
                <i class="fas fa-camera text-2xl"></i>
                <span class="text-[10px] font-black uppercase">Click para añadir foto</span>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                <input type="text" placeholder="Ej. Calculadora Científica" class="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-900 font-semibold text-sm">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo</label>
                    <select class="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-semibold text-sm">
                        <option>Libro</option>
                        <option>Equipo</option>
                        <option>Maqueta</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estado</label>
                    <select class="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-semibold text-sm">
                        <option>Como nuevo</option>
                        <option>Usado</option>
                    </select>
                </div>
            </div>
            <button onclick="triggerSuccess()" class="w-full bg-[#003366] text-white py-5 rounded-2xl font-black text-xs shadow-lg tracking-widest uppercase active:scale-95 transition-all">Publicar Material</button>
        </div>
    `;
}

/**
 * Pantalla de Perfil (Gestión)
 */
function renderProfile(container) {
    container.innerHTML = `
        <div class="bg-[#003366] p-8 rounded-[2.5rem] text-white shadow-xl mb-8">
            <div class="flex items-center gap-5">
                <div class="w-16 h-16 bg-white p-1 rounded-2xl shadow-lg">
                    <img class="rounded-xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zidane" alt="User">
                </div>
                <div>
                    <h2 class="font-black text-xl">Zidane Ramos</h2>
                    <p class="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Ingeniería de Sistemas • UAC</p>
                </div>
            </div>
        </div>

        <h3 class="font-black text-slate-800 text-xs uppercase tracking-widest px-2 mb-4">Mis Publicaciones</h3>
        
        <div class="space-y-3">
            <div class="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                        <i class="fas fa-book"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 text-sm">Cálculo Stewart</h4>
                        <p class="text-[9px] text-green-600 font-black uppercase">● Visible</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="w-9 h-9 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center"><i class="fas fa-edit"></i></button>
                    <button class="w-9 h-9 bg-red-50 text-red-500 rounded-xl flex items-center justify-center"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Función para simular éxito de operación
 */
function triggerSuccess() {
    const notif = document.getElementById('notification');
    if(notif) {
        notif.classList.add('show');
        setTimeout(() => {
            notif.classList.remove('show');
            showView('home');
        }, 2000);
    }
}

// Iniciar en el catálogo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showView('home');
});
