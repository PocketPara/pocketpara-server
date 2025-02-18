/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 21:31:01
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 12:48:10
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

    // Medical system
    MED_DATABASE: 'MED_DATABASE',
    MED_SCORES: 'MED_SCORES',
    MED_ECG_CRITERIA: 'MED_ECG_CRITERIA',

    // Extra features
    DEV_EXTRA_FEATUES: 'DEV_EXTRA_FEATUES',
    DEV_BETA_FEATURES: 'DEV_BETA_FEATURES'

};

export default Role;