
const API_AUTH = {
    login: '/auth/login',
    register: '/auth/register',
    otp: '/auth/otp'
}

const API_PROFILE = {
    change: '/change-profile',
    delete: '/delete-profile'   
}

const API_HOUSEHOLD = {
    create: '/households',
    join: '/households/join',
    leave: '/households/leave',
    get: '/households/me',
    members: (householdId: string) => `/households/${householdId}/members`
}

const API_ITEMS = {
    items: '/items', 
    itemById: (itemId: string) => `/items/${itemId}`,
    itemStatus: (itemId: string) => `/items/${itemId}/status`
}

const API_OPEN_FOOD_FACTS = {
    product: (barcode: string) => `https://world.openfoodfacts.net/api/v2/product/${barcode}.json?fields=product_name,serving_quantity`
}

const API_DASHBOARD = {
    stats: '/dashboard/stats',
    expiring: '/dashboard/expiring',
    leaderboard: '/dashboard/leaderboard',
    notifications: '/notifications'
}

export {
    API_AUTH,
    API_PROFILE,
    API_ITEMS,
    API_DASHBOARD,
    API_HOUSEHOLD,
    API_OPEN_FOOD_FACTS
}