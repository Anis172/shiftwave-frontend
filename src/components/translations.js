export const translations = {
    en: {
        // Auth
        welcome: "Welcome back!",
        manageShifts: "Manage your restaurant shifts efficiently",
        email: "Email",
        password: "Password",
        signIn: "Sign In",
        signingIn: "Signing in...",
        noAccount: "Don't have an account?",
        registerHere: "Register here",

        // Signup
        registerRestaurant: "Register Your Restaurant",
        joinShiftWave: "Join ShiftWave and manage your team effortlessly",
        restaurantName: "Restaurant Name",
        phone: "Phone",
        address: "Address",
        ownerInfo: "Owner Information",
        yourName: "Your Name",
        registerButton: "Register Restaurant",
        creatingAccount: "Creating your account...",
        alreadyHaveAccount: "Already have an account?",
        registrationSuccess: "Registration Successful!",
        restaurantRegistered: "Your restaurant has been registered.",
        redirectingLogin: "Redirecting to login...",

        // Dashboard
        managerDashboard: "Manager Dashboard",
        manageAll: "Manage shifts, workers, and coverage rules",
        workerDashboard: "Worker Dashboard",
        welcomeBack: "Welcome back",

        // Navigation
        logout: "Logout",

        // Tabs
        shifts: "Shifts",
        workers: "Workers",
        coverage: "Coverage",
        breakHistory: "Break History",

        // Shifts
        createNewShift: "Create New Shift",
        reuseShift: "Reuse Shift",
        editShift: "Edit Shift",
        worker: "Worker",
        role: "Role",
        start: "Start",
        end: "End",
        status: "Status",
        actions: "Actions",
        searchWorker: "🔍 Search worker...",
        allStatus: "All Status",
        edit: "✏️ Edit",
        reuse: "♻️ Reuse",
        delete: "🗑️",
        startTime: "Start Time",
        endTime: "End Time",
        updating: "Updating...",
        updateShift: "Update Shift",
        selectWorker: "Select worker...",
        selectRole: "Select role...",
        creating: "Creating...",
        createShift: "Create Shift",
        createReusedShift: "Create Reused Shift",

        // Worker Dashboard
        yourScheduledShifts: "Your Scheduled Shifts",
        currentlyWorking: "Currently Working",
        clockIn: "Clock In",
        clockOut: "Clock Out",
        clockedIn: "Clocked in",
        noShiftsScheduled: "No shifts scheduled",
        checkBackLater: "Check back later for your upcoming shifts",

        // UserList
        addNewWorker: "Add New Worker",
        editWorker: "Edit Worker",
        createNewWorker: "Create New Worker",
        name: "Name",
        passwordOptional: "(leave blank to keep current)",
        searchName: "🔍 Search by name...",
        searchEmail: "📧 Search by email...",
        allRoles: "All Roles",
        active: "Active",
        inactive: "Inactive",
        deactivate: "Deactivate",
        activate: "Activate",
        confirmDeleteWorker: "Are you sure you want to delete this worker?",

        // ManagerActiveBreaks
        loadingActiveBreaks: "Loading active breaks...",
        noActiveBreaks: "No Active Breaks",
        allWorkersOnDuty: "All workers are currently on duty",
        activeBreaks: "Active Breaks",
        break: "Break",
        endsAt: "Ends at",

        // CoverageRuleList
        addNewRule: "Add New Rule",
        editCoverageRule: "Edit Coverage Rule",
        createCoverageRule: "Create Coverage Rule",
        minimumWorkersRequired: "Minimum Workers Required",
        noCoverageRules: "No coverage rules defined yet",
        clickAddNewRule: "Click 'Add New Rule' to create minimum worker requirements for roles",
        minimumWorkers: "Minimum Workers",

        // BreakRequestForm
        requestBreak: "Request a Break",
        yourCurrentBreaks: "Your Current Breaks:",
        waitingApproval: "Waiting for approval",
        approvedReadyStart: "Approved - Ready to start",
        startButton: "Start",
        complete: "Complete",
        mustBeClockedIn: "You must be clocked in to request a break",
        breakApproved: "✅ Break approved! You can take your break now.",
        breakDenied: "❌ Break denied - insufficient coverage.",
        breakStarted: "🟢 Break started! Enjoy your break.",
        breakCompleted: "✅ Break completed! Back to work.",
        confirmDeleteBreak: "Are you sure you want to delete this break request?",
        breakRequestDeleted: "🗑️ Break request deleted!",
        errorDeletingBreak: "❌ Error deleting break request",
        yourActiveShift: "Your Active Shift",
        breakType: "Break Type",
        lunchBreak: "Lunch Break",
        shortBreak: "Short Break",
        emergency: "Emergency",
        sickLeave: "Sick Leave",
        personal: "Personal",

        // BreakHistory
        loadingBreakHistory: "Loading break history...",
        noBreakHistory: "No Break History",
        noCompletedBreaks: "No completed breaks yet",
        breakHistoryTitle: "Break History",
        type: "Type",
        duration: "Duration",

        // Common
        loading: "Loading...",
        cancel: "Cancel",
        create: "Create",
        update: "Update",
        save: "Save",

        // Status translations
        statusScheduled: "Scheduled",
        statusActive: "Active",
        statusCompleted: "Completed",
        statusCancelled: "Cancelled",
        statusMissed: "Missed",

        // Role translations
        roleManager: "Manager",
        roleShiftSupervisor: "Shift Supervisor",
        roleHeadChef: "Head Chef",
        roleSousChef: "Sous Chef",
        roleLineCook: "Line Cook",
        rolePrepCook: "Prep Cook",
        roleDishwasher: "Dishwasher",
        roleWaiter: "Waiter/Server",
        roleHost: "Host/Hostess",
        roleBusboy: "Busboy",
        roleBartender: "Bartender",
        roleBarback: "Barback",
        roleCashier: "Cashier",
        roleDeliveryDriver: "Delivery Driver",

        // ===== ERROR MESSAGES =====

        // Auth errors
        invalidCredentials: 'Invalid email or password',
        emailAlreadyExists: 'Email already exists',
        accountInactive: 'Account is inactive. Please contact your manager',

        // User errors
        workerNotFound: 'Worker not found',
        roleNotFound: 'Role not found',
        emailRequired: 'Email is required',
        invalidEmailFormat: 'Invalid email format',
        passwordRequired: 'Password is required',
        passwordTooShort: 'Password must be at least 8 characters',
        passwordTooShort6: 'Password must be at least 6 characters',
        nameRequired: 'Name is required',
        nameTooShort: 'Name must be at least 2 characters',
        cannotDeleteSelf: 'You cannot delete your own account',
        cannotDeactivateSelf: 'You cannot deactivate your own account',

        // Shift errors
        workerInactive: 'Cannot create shift for inactive worker. Please activate the worker first',
        workerWrongRestaurant: 'Worker does not belong to your restaurant',
        shiftNotFound: 'Shift not found',
        endTimeBeforeStart: 'End time must be after start time',
        workerRequired: 'Please select a worker',
        roleRequired: 'Please select a role',
        startTimeRequired: 'Start time is required',
        endTimeRequired: 'End time is required',

        // Coverage rules
        minimumWorkersMin: 'Minimum workers must be at least 1',
        coverageRuleNotFound: 'Coverage rule not found',

        // Break requests
        breakTypeRequired: 'Break type is required',
        shiftRequired: 'Shift is required',
        onlyOwnShifts: 'You can only request breaks for your own shifts',
        onlyActiveShifts: 'You can only request breaks during active shifts',
        insufficientCoverage: 'Insufficient coverage. Cannot approve break request',
        cannotDeleteActiveBreak: 'Cannot delete active or completed breaks',
        breakRequestNotFound: 'Break request not found',

        // Restaurant signup
        restaurantNameRequired: 'Restaurant name is required',
        restaurantNameLength: 'Restaurant name must be between 2 and 100 characters',
        addressRequired: 'Address is required',
        addressLength: 'Address must be between 5 and 200 characters',
        phoneRequired: 'Phone number is required',
        invalidPhoneFormat: 'Invalid phone number format',
        ownerNameRequired: 'Owner name is required',

        // Clock in/out modals
        cannotClockInYet: 'Cannot Clock In Yet',
        shiftStartsAt: 'Shift starts at',
        pleaseWait: 'Please wait until your scheduled start time',
        timeUntilStart: 'Time Until Start',
        okIllWait: "OK, I'll Wait",
        earlyClockOutWarning: 'Early Clock Out Warning',
        clockingOutEarly: 'You are clocking out early!',
        scheduledEndTime: 'Scheduled End',
        currentTime: 'Current Time',
        timeRemaining: 'Time Remaining',
        sureClockOutNow: 'Are you sure you want to clock out now?',

        // Generic
        networkError: 'Network error. Please try again',
        failedCreateWorker: 'Failed to create worker',
        failedUpdateWorker: 'Failed to update worker',
        failedCreateShift: 'Failed to create shift',
        failedUpdateShift: 'Failed to update shift',
        cannotRequestMultipleBreaks: 'You cannot request a new break while you have pending or active breaks',

    },

    es: {
        // Auth
        welcome: "¡Bienvenido de nuevo!",
        manageShifts: "Gestiona los turnos de tu restaurante eficientemente",
        email: "Correo Electrónico",
        password: "Contraseña",
        signIn: "Iniciar Sesión",
        signingIn: "Iniciando sesión...",
        noAccount: "¿No tienes una cuenta?",
        registerHere: "Regístrate aquí",

        // Signup
        registerRestaurant: "Registra tu Restaurante",
        joinShiftWave: "Únete a ShiftWave y gestiona tu equipo sin esfuerzo",
        restaurantName: "Nombre del Restaurante",
        phone: "Teléfono",
        address: "Dirección",
        ownerInfo: "Información del Propietario",
        yourName: "Tu Nombre",
        registerButton: "Registrar Restaurante",
        creatingAccount: "Creando tu cuenta...",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        registrationSuccess: "¡Registro Exitoso!",
        restaurantRegistered: "Tu restaurante ha sido registrado.",
        redirectingLogin: "Redirigiendo al inicio de sesión...",

        // Dashboard
        managerDashboard: "Panel del Gerente",
        manageAll: "Gestiona turnos, trabajadores y reglas de cobertura",
        workerDashboard: "Panel del Trabajador",
        welcomeBack: "Bienvenido de nuevo",

        // Navigation
        logout: "Cerrar Sesión",

        // Tabs
        shifts: "Turnos",
        workers: "Trabajadores",
        coverage: "Cobertura",
        breakHistory: "Historial de Descansos",

        // Shifts
        createNewShift: "Crear Nuevo Turno",
        reuseShift: "Reutilizar Turno",
        editShift: "Editar Turno",
        worker: "Trabajador",
        role: "Rol",
        start: "Inicio",
        end: "Fin",
        status: "Estado",
        actions: "Acciones",
        searchWorker: "🔍 Buscar trabajador...",
        allStatus: "Todos los Estados",
        edit: "✏️ Editar",
        reuse: "♻️ Reutilizar",
        delete: "🗑️",
        startTime: "Hora de Inicio",
        endTime: "Hora de Fin",
        updating: "Actualizando...",
        updateShift: "Actualizar Turno",
        selectWorker: "Seleccionar trabajador...",
        selectRole: "Seleccionar rol...",
        creating: "Creando...",
        createShift: "Crear Turno",
        createReusedShift: "Crear Turno Reutilizado",

        // Worker Dashboard
        yourScheduledShifts: "Tus Turnos Programados",
        currentlyWorking: "Trabajando Actualmente",
        clockIn: "Fichar Entrada",
        clockOut: "Fichar Salida",
        clockedIn: "Entrada fichada",
        noShiftsScheduled: "No hay turnos programados",
        checkBackLater: "Vuelve más tarde para ver tus próximos turnos",

        // UserList
        addNewWorker: "Agregar Nuevo Trabajador",
        editWorker: "Editar Trabajador",
        createNewWorker: "Crear Nuevo Trabajador",
        name: "Nombre",
        passwordOptional: "(dejar en blanco para mantener actual)",
        searchName: "🔍 Buscar por nombre...",
        searchEmail: "📧 Buscar por correo...",
        allRoles: "Todos los Roles",
        active: "Activo",
        inactive: "Inactivo",
        deactivate: "Desactivar",
        activate: "Activar",
        confirmDeleteWorker: "¿Estás seguro de que quieres eliminar este trabajador?",

        // ManagerActiveBreaks
        loadingActiveBreaks: "Cargando descansos activos...",
        noActiveBreaks: "Sin Descansos Activos",
        allWorkersOnDuty: "Todos los trabajadores están de servicio",
        activeBreaks: "Descansos Activos",
        break: "Descanso",
        endsAt: "Termina a las",

        // CoverageRuleList
        addNewRule: "Agregar Nueva Regla",
        editCoverageRule: "Editar Regla de Cobertura",
        createCoverageRule: "Crear Regla de Cobertura",
        minimumWorkersRequired: "Trabajadores Mínimos Requeridos",
        noCoverageRules: "No hay reglas de cobertura definidas aún",
        clickAddNewRule: "Haz clic en 'Agregar Nueva Regla' para crear requisitos mínimos de trabajadores por rol",
        minimumWorkers: "Trabajadores Mínimos",

        // BreakRequestForm
        requestBreak: "Solicitar Descanso",
        yourCurrentBreaks: "Tus Descansos Actuales:",
        waitingApproval: "Esperando aprobación",
        approvedReadyStart: "Aprobado - Listo para comenzar",
        startButton: "Iniciar",
        complete: "Completar",
        mustBeClockedIn: "Debes haber fichado entrada para solicitar un descanso",
        breakApproved: "✅ ¡Descanso aprobado! Puedes tomar tu descanso ahora.",
        breakDenied: "❌ Descanso denegado - cobertura insuficiente.",
        breakStarted: "🟢 ¡Descanso iniciado! Disfruta tu descanso.",
        breakCompleted: "✅ ¡Descanso completado! De vuelta al trabajo.",
        confirmDeleteBreak: "¿Estás seguro de que quieres eliminar esta solicitud de descanso?",
        breakRequestDeleted: "🗑️ ¡Solicitud de descanso eliminada!",
        errorDeletingBreak: "❌ Error al eliminar solicitud de descanso",
        yourActiveShift: "Tu Turno Activo",
        breakType: "Tipo de Descanso",
        lunchBreak: "Descanso de Almuerzo",
        shortBreak: "Descanso Corto",
        emergency: "Emergencia",
        sickLeave: "Permiso por Enfermedad",
        personal: "Personal",

        // BreakHistory
        loadingBreakHistory: "Cargando historial de descansos...",
        noBreakHistory: "Sin Historial de Descansos",
        noCompletedBreaks: "No hay descansos completados aún",
        breakHistoryTitle: "Historial de Descansos",
        type: "Tipo",
        duration: "Duración",

        // Common
        loading: "Cargando...",
        cancel: "Cancelar",
        create: "Crear",
        update: "Actualizar",
        save: "Guardar",

        // Status translations
        statusScheduled: "Programado",
        statusActive: "Activo",
        statusCompleted: "Completado",
        statusCancelled: "Cancelado",
        statusMissed: "Perdido",

        // Role translations
        roleManager: "Gerente",
        roleShiftSupervisor: "Supervisor de Turno",
        roleHeadChef: "Chef Principal",
        roleSousChef: "Sous Chef",
        roleLineCook: "Cocinero de Línea",
        rolePrepCook: "Cocinero de Preparación",
        roleDishwasher: "Lavaplatos",
        roleWaiter: "Mesero/Camarero",
        roleHost: "Anfitrión/Anfitriona",
        roleBusboy: "Ayudante de Mesero",
        roleBartender: "Bartender",
        roleBarback: "Ayudante de Bar",
        roleCashier: "Cajero",
        roleDeliveryDriver: "Conductor de Entrega",

        // ===== MENSAJES DE ERROR =====

        // Errores de autenticación
        invalidCredentials: 'Correo o contraseña inválidos',
        emailAlreadyExists: 'El correo ya existe',
        accountInactive: 'Cuenta inactiva. Contacte a su gerente',

        // Errores de usuario
        workerNotFound: 'Trabajador no encontrado',
        roleNotFound: 'Rol no encontrado',
        emailRequired: 'El correo es requerido',
        invalidEmailFormat: 'Formato de correo inválido',
        passwordRequired: 'La contraseña es requerida',
        passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
        passwordTooShort6: 'La contraseña debe tener al menos 6 caracteres',
        nameRequired: 'El nombre es requerido',
        nameTooShort: 'El nombre debe tener al menos 2 caracteres',
        cannotDeleteSelf: 'No puede eliminar su propia cuenta',
        cannotDeactivateSelf: 'No puede desactivar su propia cuenta',

        // Errores de turnos
        workerInactive: 'No se puede crear turno para trabajador inactivo. Active el trabajador primero',
        workerWrongRestaurant: 'El trabajador no pertenece a su restaurante',
        shiftNotFound: 'Turno no encontrado',
        endTimeBeforeStart: 'La hora de fin debe ser después de la hora de inicio',
        workerRequired: 'Por favor seleccione un trabajador',
        roleRequired: 'Por favor seleccione un rol',
        startTimeRequired: 'La hora de inicio es requerida',
        endTimeRequired: 'La hora de fin es requerida',

        // Reglas de cobertura
        minimumWorkersMin: 'El mínimo de trabajadores debe ser al menos 1',
        coverageRuleNotFound: 'Regla de cobertura no encontrada',

        // Solicitudes de descanso
        breakTypeRequired: 'El tipo de descanso es requerido',
        shiftRequired: 'El turno es requerido',
        onlyOwnShifts: 'Solo puede solicitar descansos para sus propios turnos',
        onlyActiveShifts: 'Solo puede solicitar descansos durante turnos activos',
        insufficientCoverage: 'Cobertura insuficiente. No se puede aprobar la solicitud',
        cannotDeleteActiveBreak: 'No se pueden eliminar descansos activos o completados',
        breakRequestNotFound: 'Solicitud de descanso no encontrada',

        // Registro de restaurante
        restaurantNameRequired: 'El nombre del restaurante es requerido',
        restaurantNameLength: 'El nombre debe tener entre 2 y 100 caracteres',
        addressRequired: 'La dirección es requerida',
        addressLength: 'La dirección debe tener entre 5 y 200 caracteres',
        phoneRequired: 'El teléfono es requerido',
        invalidPhoneFormat: 'Formato de teléfono inválido',
        ownerNameRequired: 'El nombre del propietario es requerido',

        // Modales de entrada/salida
        cannotClockInYet: 'No Puede Fichar Aún',
        shiftStartsAt: 'El turno comienza a las',
        pleaseWait: 'Por favor espere hasta la hora programada',
        timeUntilStart: 'Tiempo Hasta el Inicio',
        okIllWait: 'OK, Esperaré',
        earlyClockOutWarning: 'Advertencia de Salida Temprana',
        clockingOutEarly: '¡Está saliendo temprano!',
        scheduledEndTime: 'Fin Programado',
        currentTime: 'Hora Actual',
        timeRemaining: 'Tiempo Restante',
        sureClockOutNow: '¿Está seguro de que desea salir ahora?',

        // Genéricos
        networkError: 'Error de red. Intente de nuevo',
        failedCreateWorker: 'Error al crear trabajador',
        failedUpdateWorker: 'Error al actualizar trabajador',
        failedCreateShift: 'Error al crear turno',
        failedUpdateShift: 'Error al actualizar turno',
        cannotRequestMultipleBreaks: 'No puedes solicitar un nuevo descanso mientras tienes descansos pendientes o activos',
    },

    fr: {
        // Auth
        welcome: "Bon retour !",
        manageShifts: "Gérez les équipes de votre restaurant efficacement",
        email: "Email",
        password: "Mot de passe",
        signIn: "Se connecter",
        signingIn: "Connexion en cours...",
        noAccount: "Vous n'avez pas de compte ?",
        registerHere: "Inscrivez-vous ici",

        // Signup
        registerRestaurant: "Enregistrez votre restaurant",
        joinShiftWave: "Rejoignez ShiftWave et gérez votre équipe sans effort",
        restaurantName: "Nom du restaurant",
        phone: "Téléphone",
        address: "Adresse",
        ownerInfo: "Informations du propriétaire",
        yourName: "Votre nom",
        registerButton: "Enregistrer le restaurant",
        creatingAccount: "Création de votre compte...",
        alreadyHaveAccount: "Vous avez déjà un compte ?",
        registrationSuccess: "Inscription réussie !",
        restaurantRegistered: "Votre restaurant a été enregistré.",
        redirectingLogin: "Redirection vers la connexion...",

        // Dashboard
        managerDashboard: "Tableau de bord du gérant",
        manageAll: "Gérer les équipes, les employés et les règles de couverture",
        workerDashboard: "Tableau de bord de l'employé",
        welcomeBack: "Bon retour",

        // Navigation
        logout: "Déconnexion",

        // Tabs
        shifts: "Équipes",
        workers: "Employés",
        coverage: "Couverture",
        breakHistory: "Historique des pauses",

        // Shifts
        createNewShift: "Créer une nouvelle équipe",
        reuseShift: "Réutiliser l'équipe",
        editShift: "Modifier l'équipe",
        worker: "Employé",
        role: "Rôle",
        start: "Début",
        end: "Fin",
        status: "Statut",
        actions: "Actions",
        searchWorker: "🔍 Rechercher un employé...",
        allStatus: "Tous les statuts",
        edit: "✏️ Modifier",
        reuse: "♻️ Réutiliser",
        delete: "🗑️",
        startTime: "Heure de début",
        endTime: "Heure de fin",
        updating: "Mise à jour...",
        updateShift: "Mettre à jour l'équipe",
        selectWorker: "Sélectionner un employé...",
        selectRole: "Sélectionner un rôle...",
        creating: "Création...",
        createShift: "Créer l'équipe",
        createReusedShift: "Créer l'équipe réutilisée",

        // Worker Dashboard
        yourScheduledShifts: "Vos équipes programmées",
        currentlyWorking: "Actuellement en service",
        clockIn: "Pointer l'arrivée",
        clockOut: "Pointer le départ",
        clockedIn: "Arrivée pointée",
        noShiftsScheduled: "Aucune équipe programmée",
        checkBackLater: "Revenez plus tard pour vos prochaines équipes",

        // UserList
        addNewWorker: "Ajouter un nouvel employé",
        editWorker: "Modifier l'employé",
        createNewWorker: "Créer un nouvel employé",
        name: "Nom",
        passwordOptional: "(laisser vide pour conserver l'actuel)",
        searchName: "🔍 Rechercher par nom...",
        searchEmail: "📧 Rechercher par email...",
        allRoles: "Tous les rôles",
        active: "Actif",
        inactive: "Inactif",
        deactivate: "Désactiver",
        activate: "Activer",
        confirmDeleteWorker: "Êtes-vous sûr de vouloir supprimer cet employé?",

        // ManagerActiveBreaks
        loadingActiveBreaks: "Chargement des pauses actives...",
        noActiveBreaks: "Aucune pause active",
        allWorkersOnDuty: "Tous les employés sont en service",
        activeBreaks: "Pauses actives",
        break: "Pause",
        endsAt: "Se termine à",

        // CoverageRuleList
        addNewRule: "Ajouter une nouvelle règle",
        editCoverageRule: "Modifier la règle de couverture",
        createCoverageRule: "Créer une règle de couverture",
        minimumWorkersRequired: "Employés minimum requis",
        noCoverageRules: "Aucune règle de couverture définie",
        clickAddNewRule: "Cliquez sur 'Ajouter une nouvelle règle' pour créer des exigences minimales d'employés par rôle",
        minimumWorkers: "Employés minimum",

        // BreakRequestForm
        requestBreak: "Demander une pause",
        yourCurrentBreaks: "Vos pauses actuelles :",
        waitingApproval: "En attente d'approbation",
        approvedReadyStart: "Approuvée - Prête à commencer",
        startButton: "Démarrer",
        complete: "Terminer",
        mustBeClockedIn: "Vous devez avoir pointé pour demander une pause",
        breakApproved: "✅ Pause approuvée ! Vous pouvez prendre votre pause maintenant.",
        breakDenied: "❌ Pause refusée - couverture insuffisante.",
        breakStarted: "🟢 Pause commencée ! Profitez de votre pause.",
        breakCompleted: "✅ Pause terminée ! Retour au travail.",
        confirmDeleteBreak: "Êtes-vous sûr de vouloir supprimer cette demande de pause ?",
        breakRequestDeleted: "🗑️ Demande de pause supprimée !",
        errorDeletingBreak: "❌ Erreur lors de la suppression de la demande de pause",
        yourActiveShift: "Votre équipe active",
        breakType: "Type de pause",
        lunchBreak: "Pause déjeuner",
        shortBreak: "Pause courte",
        emergency: "Urgence",
        sickLeave: "Congé maladie",
        personal: "Personnel",

        // BreakHistory
        loadingBreakHistory: "Chargement de l'historique des pauses...",
        noBreakHistory: "Aucun historique de pauses",
        noCompletedBreaks: "Aucune pause terminée pour le moment",
        breakHistoryTitle: "Historique des pauses",
        type: "Type",
        duration: "Durée",

        // Common
        loading: "Chargement...",
        cancel: "Annuler",
        create: "Créer",
        update: "Mettre à jour",
        save: "Enregistrer",

        // Status translations
        statusScheduled: "Programmé",
        statusActive: "Actif",
        statusCompleted: "Terminé",
        statusCancelled: "Annulé",
        statusMissed: "Manqué",

        // Role translations
        roleManager: "Gérant",
        roleShiftSupervisor: "Superviseur d'équipe",
        roleHeadChef: "Chef Principal",
        roleSousChef: "Sous Chef",
        roleLineCook: "Cuisinier de Ligne",
        rolePrepCook: "Cuisinier de Préparation",
        roleDishwasher: "Plongeur",
        roleWaiter: "Serveur",
        roleHost: "Hôte/Hôtesse",
        roleBusboy: "Aide-serveur",
        roleBartender: "Barman",
        roleBarback: "Aide-barman",
        roleCashier: "Caissier",
        roleDeliveryDriver: "Livreur",

        // ===== MESSAGES D'ERREUR =====

        // Erreurs d'authentification
        invalidCredentials: 'Email ou mot de passe invalide',
        emailAlreadyExists: 'L\'email existe déjà',
        accountInactive: 'Compte inactif. Contactez votre manager',

        // Erreurs d'utilisateur
        workerNotFound: 'Travailleur non trouvé',
        roleNotFound: 'Rôle non trouvé',
        emailRequired: 'L\'email est requis',
        invalidEmailFormat: 'Format d\'email invalide',
        passwordRequired: 'Le mot de passe est requis',
        passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordTooShort6: 'Le mot de passe doit contenir au moins 6 caractères',
        nameRequired: 'Le nom est requis',
        nameTooShort: 'Le nom doit contenir au moins 2 caractères',
        cannotDeleteSelf: 'Vous ne pouvez pas supprimer votre propre compte',
        cannotDeactivateSelf: 'Vous ne pouvez pas désactiver votre propre compte',

        // Erreurs de quarts de travail
        workerInactive: 'Impossible de créer un quart pour un travailleur inactif. Activez d\'abord le travailleur',
        workerWrongRestaurant: 'Le travailleur n\'appartient pas à votre restaurant',
        shiftNotFound: 'Quart de travail non trouvé',
        endTimeBeforeStart: 'L\'heure de fin doit être après l\'heure de début',
        workerRequired: 'Veuillez sélectionner un travailleur',
        roleRequired: 'Veuillez sélectionner un rôle',
        startTimeRequired: 'L\'heure de début est requise',
        endTimeRequired: 'L\'heure de fin est requise',

        // Règles de couverture
        minimumWorkersMin: 'Le minimum de travailleurs doit être au moins 1',
        coverageRuleNotFound: 'Règle de couverture non trouvée',

        // Demandes de pause
        breakTypeRequired: 'Le type de pause est requis',
        shiftRequired: 'Le quart de travail est requis',
        onlyOwnShifts: 'Vous ne pouvez demander des pauses que pour vos propres quarts',
        onlyActiveShifts: 'Vous ne pouvez demander des pauses que pendant les quarts actifs',
        insufficientCoverage: 'Couverture insuffisante. Impossible d\'approuver la demande',
        cannotDeleteActiveBreak: 'Impossible de supprimer les pauses actives ou terminées',
        breakRequestNotFound: 'Demande de pause non trouvée',

        // Inscription restaurant
        restaurantNameRequired: 'Le nom du restaurant est requis',
        restaurantNameLength: 'Le nom doit contenir entre 2 et 100 caractères',
        addressRequired: 'L\'adresse est requise',
        addressLength: 'L\'adresse doit contenir entre 5 et 200 caractères',
        phoneRequired: 'Le téléphone est requis',
        invalidPhoneFormat: 'Format de téléphone invalide',
        ownerNameRequired: 'Le nom du propriétaire est requis',

        // Modales d'entrée/sortie
        cannotClockInYet: 'Impossible de Pointer pour le Moment',
        shiftStartsAt: 'Le quart commence à',
        pleaseWait: 'Veuillez patienter jusqu\'à l\'heure prévue',
        timeUntilStart: 'Temps Jusqu\'au Début',
        okIllWait: 'OK, Je Vais Attendre',
        earlyClockOutWarning: 'Avertissement de Sortie Anticipée',
        clockingOutEarly: 'Vous sortez tôt!',
        scheduledEndTime: 'Fin Prévue',
        currentTime: 'Heure Actuelle',
        timeRemaining: 'Temps Restant',
        sureClockOutNow: 'Êtes-vous sûr de vouloir sortir maintenant?',

        // Génériques
        networkError: 'Erreur réseau. Veuillez réessayer',
        failedCreateWorker: 'Échec de la création du travailleur',
        failedUpdateWorker: 'Échec de la mise à jour du travailleur',
        failedCreateShift: 'Échec de la création du quart',
        failedUpdateShift: 'Échec de la mise à jour du quart',
        cannotRequestMultipleBreaks: 'Vous ne pouvez pas demander une nouvelle pause tant que vous avez des pauses en attente ou actives',

    },

    ar: {
        // Auth
        welcome: "مرحباً بعودتك!",
        manageShifts: "إدارة نوبات مطعمك بكفاءة",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        signIn: "تسجيل الدخول",
        signingIn: "جاري تسجيل الدخول...",
        noAccount: "ليس لديك حساب؟",
        registerHere: "سجل هنا",

        // Signup
        registerRestaurant: "سجل مطعمك",
        joinShiftWave: "انضم إلى ShiftWave وأدر فريقك بسهولة",
        restaurantName: "اسم المطعم",
        phone: "الهاتف",
        address: "العنوان",
        ownerInfo: "معلومات المالك",
        yourName: "اسمك",
        registerButton: "تسجيل المطعم",
        creatingAccount: "جاري إنشاء حسابك...",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        registrationSuccess: "تم التسجيل بنجاح!",
        restaurantRegistered: "تم تسجيل مطعمك.",
        redirectingLogin: "جاري التوجيه إلى تسجيل الدخول...",

        // Dashboard
        managerDashboard: "لوحة تحكم المدير",
        manageAll: "إدارة النوبات والعمال وقواعد التغطية",
        workerDashboard: "لوحة تحكم العامل",
        welcomeBack: "مرحباً بعودتك",

        // Navigation
        logout: "تسجيل الخروج",

        // Tabs
        shifts: "النوبات",
        workers: "العمال",
        coverage: "التغطية",
        breakHistory: "سجل الاستراحات",

        // Shifts
        createNewShift: "إنشاء نوبة جديدة",
        reuseShift: "إعادة استخدام النوبة",
        editShift: "تعديل النوبة",
        worker: "عامل",
        role: "الدور",
        start: "البداية",
        end: "النهاية",
        status: "الحالة",
        actions: "الإجراءات",
        searchWorker: "🔍 بحث عن عامل...",
        allStatus: "جميع الحالات",
        edit: "✏️ تعديل",
        reuse: "♻️ إعادة استخدام",
        delete: "🗑️",
        startTime: "وقت البداية",
        endTime: "وقت النهاية",
        updating: "جاري التحديث...",
        updateShift: "تحديث النوبة",
        selectWorker: "اختر عامل...",
        selectRole: "اختر دور...",
        creating: "جاري الإنشاء...",
        createShift: "إنشاء نوبة",
        createReusedShift: "إنشاء نوبة معاد استخدامها",

        // Worker Dashboard
        yourScheduledShifts: "نوباتك المجدولة",
        currentlyWorking: "تعمل حالياً",
        clockIn: "تسجيل الحضور",
        clockOut: "تسجيل الانصراف",
        clockedIn: "تم تسجيل الحضور",
        noShiftsScheduled: "لا توجد نوبات مجدولة",
        checkBackLater: "تحقق لاحقاً من نوباتك القادمة",

        // UserList
        addNewWorker: "إضافة عامل جديد",
        editWorker: "تعديل العامل",
        createNewWorker: "إنشاء عامل جديد",
        name: "الاسم",
        passwordOptional: "(اتركه فارغاً للاحتفاظ بالحالي)",
        searchName: "🔍 البحث بالاسم...",
        searchEmail: "📧 البحث بالبريد...",
        allRoles: "جميع الأدوار",
        active: "نشط",
        inactive: "غير نشط",
        deactivate: "إلغاء التنشيط",
        activate: "تنشيط",
        confirmDeleteWorker: "هل أنت متأكد من حذف هذا العامل؟",

        // ManagerActiveBreaks
        loadingActiveBreaks: "جاري تحميل الاستراحات النشطة...",
        noActiveBreaks: "لا توجد استراحات نشطة",
        allWorkersOnDuty: "جميع العمال في الخدمة",
        activeBreaks: "الاستراحات النشطة",
        break: "استراحة",
        endsAt: "تنتهي في",

        // CoverageRuleList
        addNewRule: "إضافة قاعدة جديدة",
        editCoverageRule: "تعديل قاعدة التغطية",
        createCoverageRule: "إنشاء قاعدة التغطية",
        minimumWorkersRequired: "الحد الأدنى من العمال المطلوبين",
        noCoverageRules: "لا توجد قواعد تغطية محددة بعد",
        clickAddNewRule: "انقر على 'إضافة قاعدة جديدة' لإنشاء متطلبات الحد الأدنى من العمال لكل دور",
        minimumWorkers: "الحد الأدنى من العمال",

        // BreakRequestForm
        requestBreak: "طلب استراحة",
        yourCurrentBreaks: "استراحاتك الحالية:",
        waitingApproval: "في انتظار الموافقة",
        approvedReadyStart: "تمت الموافقة - جاهز للبدء",
        startButton: "بدء",
        complete: "إكمال",
        mustBeClockedIn: "يجب أن تكون مسجل الحضور لطلب استراحة",
        breakApproved: "✅ تمت الموافقة على الاستراحة! يمكنك أخذ استراحتك الآن.",
        breakDenied: "❌ تم رفض الاستراحة - تغطية غير كافية.",
        breakStarted: "🟢 بدأت الاستراحة! استمتع باستراحتك.",
        breakCompleted: "✅ اكتملت الاستراحة! العودة إلى العمل.",
        confirmDeleteBreak: "هل أنت متأكد من حذف طلب الاستراحة هذا؟",
        breakRequestDeleted: "🗑️ تم حذف طلب الاستراحة!",
        errorDeletingBreak: "❌ خطأ في حذف طلب الاستراحة",
        yourActiveShift: "نوبتك النشطة",
        breakType: "نوع الاستراحة",
        lunchBreak: "استراحة غداء",
        shortBreak: "استراحة قصيرة",
        emergency: "طارئ",
        sickLeave: "إجازة مرضية",
        personal: "شخصي",

        // BreakHistory
        loadingBreakHistory: "جاري تحميل سجل الاستراحات...",
        noBreakHistory: "لا يوجد سجل استراحات",
        noCompletedBreaks: "لا توجد استراحات مكتملة بعد",
        breakHistoryTitle: "سجل الاستراحات",
        type: "النوع",
        duration: "المدة",

        // Common
        loading: "جاري التحميل...",
        cancel: "إلغاء",
        create: "إنشاء",
        update: "تحديث",
        save: "حفظ",

        // Status translations
        statusScheduled: "مجدول",
        statusActive: "نشط",
        statusCompleted: "مكتمل",
        statusCancelled: "ملغي",
        statusMissed: "فائت",

        // Role translations
        roleManager: "مدير",
        roleShiftSupervisor: "مشرف النوبة",
        roleHeadChef: "طاهي رئيسي",
        roleSousChef: "طاهي مساعد",
        roleLineCook: "طاهي خط",
        rolePrepCook: "طاهي تحضير",
        roleDishwasher: "غسالة أطباق",
        roleWaiter: "نادل",
        roleHost: "مضيف",
        roleBusboy: "مساعد نادل",
        roleBartender: "نادل مشروبات",
        roleBarback: "مساعد بار",
        roleCashier: "أمين صندوق",
        roleDeliveryDriver: "سائق توصيل",

        // ===== رسائل الخطأ =====

        // أخطاء المصادقة
        invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صالحة',
        emailAlreadyExists: 'البريد الإلكتروني موجود بالفعل',
        accountInactive: 'الحساب غير نشط. يرجى الاتصال بالمدير',

        // أخطاء المستخدم
        workerNotFound: 'العامل غير موجود',
        roleNotFound: 'الدور غير موجود',
        emailRequired: 'البريد الإلكتروني مطلوب',
        invalidEmailFormat: 'تنسيق البريد الإلكتروني غير صالح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordTooShort: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
        passwordTooShort6: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
        nameRequired: 'الاسم مطلوب',
        nameTooShort: 'يجب أن يتكون الاسم من حرفين على الأقل',
        cannotDeleteSelf: 'لا يمكنك حذف حسابك الخاص',
        cannotDeactivateSelf: 'لا يمكنك إلغاء تنشيط حسابك الخاص',

        // أخطاء المناوبات
        workerInactive: 'لا يمكن إنشاء مناوبة لعامل غير نشط. قم بتنشيط العامل أولاً',
        workerWrongRestaurant: 'العامل لا ينتمي إلى مطعمك',
        shiftNotFound: 'المناوبة غير موجودة',
        endTimeBeforeStart: 'يجب أن يكون وقت الانتهاء بعد وقت البدء',
        workerRequired: 'يرجى اختيار عامل',
        roleRequired: 'يرجى اختيار دور',
        startTimeRequired: 'وقت البدء مطلوب',
        endTimeRequired: 'وقت الانتهاء مطلوب',

        // قواعد التغطية
        minimumWorkersMin: 'يجب أن يكون الحد الأدنى من العمال 1 على الأقل',
        coverageRuleNotFound: 'قاعدة التغطية غير موجودة',

        // طلبات الاستراحة
        breakTypeRequired: 'نوع الاستراحة مطلوب',
        shiftRequired: 'المناوبة مطلوبة',
        onlyOwnShifts: 'يمكنك فقط طلب فترات راحة لمناوباتك الخاصة',
        onlyActiveShifts: 'يمكنك فقط طلب فترات راحة أثناء المناوبات النشطة',
        insufficientCoverage: 'تغطية غير كافية. لا يمكن الموافقة على الطلب',
        cannotDeleteActiveBreak: 'لا يمكن حذف فترات الراحة النشطة أو المكتملة',
        breakRequestNotFound: 'طلب الاستراحة غير موجود',

        // تسجيل المطعم
        restaurantNameRequired: 'اسم المطعم مطلوب',
        restaurantNameLength: 'يجب أن يتراوح اسم المطعم بين 2 و 100 حرف',
        addressRequired: 'العنوان مطلوب',
        addressLength: 'يجب أن يتراوح العنوان بين 5 و 200 حرف',
        phoneRequired: 'الهاتف مطلوب',
        invalidPhoneFormat: 'تنسيق الهاتف غير صالح',
        ownerNameRequired: 'اسم المالك مطلوب',

        // نماذج تسجيل الدخول/الخروج
        cannotClockInYet: 'لا يمكن تسجيل الدخول بعد',
        shiftStartsAt: 'تبدأ المناوبة في',
        pleaseWait: 'يرجى الانتظار حتى وقت البدء المقرر',
        timeUntilStart: 'الوقت حتى البدء',
        okIllWait: 'حسنًا، سأنتظر',
        earlyClockOutWarning: 'تحذير الخروج المبكر',
        clockingOutEarly: 'أنت تسجل الخروج مبكرًا!',
        scheduledEndTime: 'وقت الانتهاء المقرر',
        currentTime: 'الوقت الحالي',
        timeRemaining: 'الوقت المتبقي',
        sureClockOutNow: 'هل أنت متأكد أنك تريد تسجيل الخروج الآن؟',

        // عام
        networkError: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى',
        failedCreateWorker: 'فشل في إنشاء العامل',
        failedUpdateWorker: 'فشل في تحديث العامل',
        failedCreateShift: 'فشل في إنشاء المناوبة',
        failedUpdateShift: 'فشل في تحديث',
        cannotRequestMultipleBreaks: 'لا يمكنك طلب استراحة جديدة بينما لديك استراحات معلقة أو نشطة',



    } };