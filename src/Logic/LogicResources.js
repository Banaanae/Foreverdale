const { LogicDataType } = require('./LogicData.js')
import LogicDataTableResource from './LogicDataTableResource.js'
import LogicDataTables from './LogicDataTables.js'

class LogicResources {
    static createDataTableResourcesArray () {
        const DataTables = []

		DataTables.push(new LogicDataTableResource("csv_client/animations.csv", LogicDataType.ANIMATIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/billing_packages.csv", LogicDataType.BILLING_PACKAGES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/boombox.csv", LogicDataType.BOOMBOX, 0))
		DataTables.push(new LogicDataTableResource("csv_client/building_skins.csv", LogicDataType.BUILDING_SKINS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/carriers.csv", LogicDataType.CARRIERS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/character_gfx_mod.csv", LogicDataType.CHARACTER_GFX_MOD, 0))
		DataTables.push(new LogicDataTableResource("csv_client/character_gfx.csv", LogicDataType.CHARACTER_GFX, 0))
		DataTables.push(new LogicDataTableResource("csv_client/character_skins.csv", LogicDataType.CHARACTER_SKINS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/chat_locales.csv", LogicDataType.CHAT_LOCALES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/client_globals.csv", LogicDataType.CLIENT_GLOBALS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/collision_shapes.csv", LogicDataType.COLLISION_SHAPES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/credits.csv", LogicDataType.CREDITS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/deeplinks.csv", LogicDataType.DEEPLINKS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/device_profiles.csv", LogicDataType.DEVICE_PROFILES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/event_entries.csv", LogicDataType.EVENT_ENTRIES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/faq.csv", LogicDataType.FAQ, 0))
		DataTables.push(new LogicDataTableResource("csv_client/helpshift.csv", LogicDataType.HELPSHIFT, 0))
		DataTables.push(new LogicDataTableResource("csv_client/hints.csv", LogicDataType.HINTS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/landmarks_groups.csv", LogicDataType.LANDMARK_GROUPS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/landmarks_propagation.csv", LogicDataType.LANDMARK_PROPAGATION, 0))
		DataTables.push(new LogicDataTableResource("csv_client/locales.csv", LogicDataType.LOCALES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/music.csv", LogicDataType.MUSIC, 0))
		DataTables.push(new LogicDataTableResource("csv_client/names.csv", LogicDataType.NAMES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/news.csv", LogicDataType.NEWS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/resource_packs.csv", LogicDataType.RESOURCE_PACKS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/social_networks.csv", LogicDataType.SOCIAL_NETWORKS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/techtree_nodes.csv", LogicDataType.TECHTREE_NODES, 0))
		DataTables.push(new LogicDataTableResource("csv_client/texts_patch.csv", LogicDataType.TEXTS_PATCH, 0))
		DataTables.push(new LogicDataTableResource("csv_client/texts.csv", LogicDataType.TEXTS, 0))
		DataTables.push(new LogicDataTableResource("csv_client/valley_action_reasons.csv", LogicDataType.VALLEY_ACTION_REASONS, 0))

		DataTables.push(new LogicDataTableResource("csv_logic/achievements.csv", LogicDataType.ACHIEVEMENTS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/advices.csv", LogicDataType.ADVICES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/animals.csv", LogicDataType.ANIMALS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/banner_layers.csv", LogicDataType.BANNER_LAYERS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/boats.csv", LogicDataType.BOATS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/building_classes.csv", LogicDataType.BUILDING_CLASSES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/building_tasks.csv", LogicDataType.BUILDING_TASKS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/buildings.csv", LogicDataType.BUILDINGS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/calendar_event_functions.csv", LogicDataType.CALENDAR_EVENT_FUNCTIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/calendar.csv", LogicDataType.CALENDAR, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/carts.csv", LogicDataType.CARTS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/challenges.csv", LogicDataType.CHALLENGES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/chests.csv", LogicDataType.CHESTS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/countries.csv", LogicDataType.COUNTRIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/cycles.csv", LogicDataType.CYCLES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/experience_levels.csv", LogicDataType.EXPERIENCE_LEVELS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/ftue_analytic_events.csv", LogicDataType.FTUE_ANALYTIC_EVENTS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/globals.csv", LogicDataType.GLOBALS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/ingredient_probabilities.csv", LogicDataType.INGREDIENT_PROBABILITIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/landmarks.csv", LogicDataType.LANDMARKS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/matchmaking_activity_scores.csv", LogicDataType.MATCHMAKING_ACTIVITY_SCORES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/missions.csv", LogicDataType.MISSIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_building_locations.csv", LogicDataType.NATION_BUILDING_LOCATIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_buildings.csv", LogicDataType.NATION_BUILDINGS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_challenge_locations.csv", LogicDataType.NATION_CHALLENGE_LOCATIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_experience_levels.csv", LogicDataType.NATION_EXPERIENCE_LEVELS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_techs.csv", LogicDataType.NATION_TECHS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/nation_techtree_rows.csv", LogicDataType.NATION_TECHTREE_ROWS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/notifications.csv", LogicDataType.NOTIFICATIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/npcs.csv", LogicDataType.NPCS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/obstacles.csv", LogicDataType.OBSTACLES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/offer_cycles.csv", LogicDataType.OFFER_CYCLES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/offer_groups.csv", LogicDataType.OFFER_GROUPS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/offer_pages.csv", LogicDataType.OFFER_PAGES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/offers.csv", LogicDataType.OFFERS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/perks.csv", LogicDataType.PERKS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/potion_probabilities.csv", LogicDataType.POTION_PROBABILITIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/professions.csv", LogicDataType.PROFESSIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/quests.csv", LogicDataType.QUESTS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/reputation_milestones.csv", LogicDataType.REPUTATION_MILESTONES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/resource_categories.csv", LogicDataType.RESOURCE_CATEGORIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/resource_recipes.csv", LogicDataType.RESOURCE_RECIPES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/resources.csv", LogicDataType.RESOURCES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/reward_probabilities.csv", LogicDataType.REWARD_PROBABILITIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/roads.csv", LogicDataType.ROADS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/specialties.csv", LogicDataType.SPECIALTIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/task_resource_groups.csv", LogicDataType.TASK_RESOURCE_GROUPS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/tasks.csv", LogicDataType.TASKS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/techs.csv", LogicDataType.TECHS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/techtree_rows.csv", LogicDataType.TECHTREE_ROWS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/tilemaps.csv", LogicDataType.TILEMAPS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/tool_probabilities.csv", LogicDataType.TOOL_PROBABILITIES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/tools.csv", LogicDataType.TOOLS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/townhall_levels.csv", LogicDataType.TOWNHALL_LEVELS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/trade_partners.csv", LogicDataType.TRADE_PARTNERS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/valley_tags.csv", LogicDataType.VALLEY_TABLES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/variables.csv", LogicDataType.VARIABLES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/village_locations.csv", LogicDataType.VILLAGE_LOCATIONS, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/village_starting_layout.csv", LogicDataType.VILLAGE_STARTING_LAYOUT, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/village_task_batches.csv", LogicDataType.VILLAGER_TASK_BATCHES, 0))
		DataTables.push(new LogicDataTableResource("csv_logic/workers.csv", LogicDataType.WORKERS, 0))

        return DataTables
    }

    static load (resources, id, node) {
        const resource = resources[id]
        switch (resource.getTableType()) {
            case 0:
                LogicDataTables.initDataTables(node, resource.getTableIndex())
                break
            case 3:
                // StringTable
                break
            default:
                Err("LogicResources::Invalid resource type")
        }

        if (resources.length - 1 === id) {
            LogicDataTables.createReferences()
        }
    }
}

export default LogicResources