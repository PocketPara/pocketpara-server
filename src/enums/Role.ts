/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 21:31:01
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:55:32
 * @ Description: Defines all roles
 */
const Role = {
    // Superior permissions
    ADMIN: 'ADMIN',

    // Tracking system
    TRA_SHIFT_TRACKER: 'TRA_SHIFT_TRACKER',
    TRA_MISSION_TRACKER: 'TRA_MISSION_TRACKER',
    TRA_MISSION_STATISTICS: 'TRA_MISSION_STATISTICS',
    TRA_SHIFT_STATISTICS: 'TRA_SHIFT_STATISTICS',

    // Customisation
    CUSTOMIZE_CARS: 'CUSTOMIZE_CARS',
    CUSTOMIZE_KEYWORDS: 'CUSTOMIZE_KEYWORDS',
    CUSTOMIZE_EVENTS: 'CUSTOMIZE_EVENTS',

    // Medical system
    MED_DATABASE: 'MED_DATABASE',
    MED_SCORES: 'MED_SCORES',
    MED_ECG_CRITERIA: 'MED_ECG_CRITERIA',

    // Extra features
    DEV_EXTRA_FEATUES: 'DEV_EXTRA_FEATUES',
    DEV_BETA_FEATURES: 'DEV_BETA_FEATURES'

};

export default Role;