// Helper function to convert backend status to translation key
export const getStatusKey = (status) => {
    const statusMap = {
        'SCHEDULED': 'statusScheduled',
        'ACTIVE': 'statusActive',
        'COMPLETED': 'statusCompleted',
        'CANCELLED': 'statusCancelled',
        'MISSED': 'statusMissed'
    };
    return statusMap[status] || status;
};

// Helper function to convert backend role name to translation key
export const getRoleKey = (roleName) => {
    const roleMap = {
        'Manager': 'roleManager',
        'Shift Supervisor': 'roleShiftSupervisor',
        'Head Chef': 'roleHeadChef',
        'Sous Chef': 'roleSousChef',
        'Line Cook': 'roleLineCook',
        'Prep Cook': 'rolePrepCook',
        'Dishwasher': 'roleDishwasher',
        'Waiter/Server': 'roleWaiter',
        'Host/Hostess': 'roleHost',
        'Busboy': 'roleBusboy',
        'Bartender': 'roleBartender',
        'Barback': 'roleBarback',
        'Cashier': 'roleCashier',
        'Delivery Driver': 'roleDeliveryDriver'
    };
    return roleMap[roleName] || roleName;
};