const LogicRandom = require('../../../Logic/LogicRandom')
const LogicDeliverableManager = require('../../../Logic/Reflectable/LogicDeliverableManager')
const LogicJSONOutReflector = require('../../../Logic/Reflector/LogicJSONOutReflector')
const LogicRawInReflector = require('../../../Logic/Reflector/LogicRawInReflector')
const LogicRawOutReflector = require('../../../Logic/Reflector/LogicRawOutReflector')
const PiranhaMessage = require('../../PiranhaMessage')

class OwnHomeDataMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 24548
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeInt(0)
        this.stream.writeLongLong(0, 1)

        // LogicClientAvatar::encode
        // 7AB9E8

        this.stream.writeLongLong(0, 1)
        this.stream.writeStringReference("Banaanae")
        this.stream.writeInt(0) // reg state
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)

        // 683D00
        // todo - how does code go from reflactable id to vtable, and why is this home so hidden

        const dm = new LogicJSONOutReflector({});
        //const dm = new LogicRawOutReflector(this.stream)
        dm.reflectInt(11, "version", 0)
        dm.reflectInt(0, "debug_a", 0)
        dm.reflectLong(0, 0, "check_tok", 0, 0)

        dm.reflectObject("home")
        dm.reflectLong(0, 1, "id", 0, 0)
        dm.reflectString("Banaanae", "name", "") //todo last arg
        dm.reflectInt(1, "m_expLevel", 0)
        dm.reflectInt(1, "m_reputation", 0)
        dm.reflectInt(1, "m_cumulativeReputation", 0)
        dm.reflectInt(1, "m_cumulativeValleyReputation", 0)
        dm.reflectLong(0, 0, "allianceId")
        dm.reflectInt(0, "Banner", 0) // only if alliance?
        dm.reflectString("", "m_facebookId", null)
        dm.reflectBool(true, "m_nameSetByUser", 0)
        dm.reflectInt(1, "m_expPoints", 0)
        dm.reflectInt(1, "m_diamonds", 0)
        dm.reflectInt(1, "m_freeDiamonds", 0)
        dm.reflectInt(1, "m_score", 0)
        dm.reflectInt(0, "m_cumulativePurchasedDiamonds", 0)
        dm.reflectLong(0, 0, "m_onStrike", 0, 0)
        dm.reflectInt(1000, "m_lastSeenTime", 0)
        dm.reflectInt(0, "m_surveyState", 0)
        dm.reflectBool(false, "m_isTimeZoneOffsetSet")
        dm.reflectInt(0, "m_isTimeZoneOffsetSet", 0)
        dm.reflectLong(0, 0, "nameChangeLockedTimeSeconds", 0, 0)
        dm.reflectInt(0, "m_totalSpendUsdCents", 0)
        dm.reflectLong(0, 0, "m_lastPurchaseTime", 0, 0)
        dm.reflectInt(0, "m_totalPurchaseCount", 0)
        dm.reflectExitObject()

        // TODO (a1 + 352) + 16LL
        // TODO (a1 + 16) + 64LL

        // sub_33E848
        dm.reflectArray(0, "instances")

        // sub_6042D0
        dm.reflectObject("offerManager")
        dm.reflectExitObject()

        // sub_AC87D8
        dm.reflectObject("techTree")
        dm.reflectExitObject()

        // if (a4 & 1) != 0
        // sub_8E9EDC
        dm.reflectArray(0, "events")

        // wnotes 1004

        dm.reflectLong(0, 0, "boost_timer", 0, 0)
        dm.reflectBool(false, "boost_pause", 0)
        dm.reflectLong(0, 0, "boosts_regen", 0, 0)
        dm.reflectLong(0, 0, "boosts_spent", 0, 0)
        dm.reflectInt(0, "boost_fills", 0)
        dm.reflectInt(1, "last_alliance_level", 0)

        // mail manager

        dm.reflectInt(0, "leave_reason", 0)
        dm.reflectIntArray([], "challenge_seen")
        dm.reflectIntArray([], "challenge_page_seen")
        dm.reflectRandom(new LogicRandom(1000 + Math.floor(Math.random() * 9001)), "mapRandom")
        dm.reflectRandom(new LogicRandom(1000 + Math.floor(Math.random() * 9001)), "workerRandom")
        dm.reflectRandom(new LogicRandom(1000 + Math.floor(Math.random() * 9001)), "lvlRandom")
        dm.reflectLong(0, 0, "on_strike", 0, 0)
        dm.reflectLong(0, 0, "joined_nation", 0, 0)
        dm.reflectLong(0, 0, "own_act_c", 0, 0)

        // 3 dynamic longs
        // dword_125A9CC qword_125A9D0
        // dword_1263AA4 qword_1263AA8
        // dword_1267024 qword_1267028

        // sub_4BCCB0
        dm.reflectObject("questMan")
        dm.reflectExitObject()

        // sub_9734D8
        dm.reflectObject("toolInv")
        dm.reflectExitObject()

        //sub_3C36A0
        dm.reflectObject("reputation_manager")
        dm.reflectExitObject()

        //sub_4460F8
        dm.reflectObject("missionManager")
        dm.reflectExitObject()

        //sub_927EB4
        dm.reflectObject("ttphelp")
        dm.reflectExitObject()

        // TODO LogicJsonOutReflector + 352LL

        dm.reflectInt(1, "boat_energy", 0)
        dm.reflectInt(1, "boat_energy_reg", 0)
        dm.reflectInt(1, "chall_energy", 0)
        dm.reflectInt(1, "constr_energy", 0)
        dm.reflectInt(1, "constr_energy_reg", 0)
        dm.reflectInt(1, "move_energy", 0)
        dm.reflectInt(1, "move_energy_reg", 0)
        dm.reflectArray(0, "known")
        // ^ if 0 goto LABEL_51

        dm.reflectObject("nation")
        dm.reflectExitObject()
        dm.reflectArray(0, "ntfs")
        // ^ if 0 goto LABEL_106

        // TODO: sub_69FF44
        // TODO: sub_3D11B0

        dm.reflectIntArray([], "ftue_events")
        dm.reflectInt(0, "valley_tasks", 0)

        // TODO: sub_BB2548
        // TODO: sub_B17594
        // TODO: sub_B17594

        dm.reflectObject("eventManager")
        // (a1 + 384) + 40LL
        dm.reflectExitObject()
        dm.reflectObject("history")
        // past_members
        dm.reflectExitObject()
        dm.reflectInt(0, "known_pc", 0)
        dm.reflectString("a333e3cb0c67e89472a844a2c4e1ece810fed803", "ch_hash", 0) // TODO

        if (false) {
            this.stream.writeBoolean(true)
            this.stream.writeLongLong(0, 1)
        } else {
            this.stream.writeBoolean(false)
        }

        this.stream.writeBoolean(true)
        this.stream.writeString("Banaanae")
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)

        // v5 = (a1 + 80)
        // v5 > 0
        this.stream.writeBoolean(false)
        if (!false) {
            this.stream.writeString(JSON.stringify(dm.jsonData)) // a1 + 64
        } else {
            this.stream.writeBytes(Buffer.from(dm.byteStream)) // a1 + 80
        }

        this.stream.writeLongLong(0, 1)
        this.stream.writeLongLong(0, 1)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)

        this.stream.writeInt(1)

        let rawOut = new LogicRawOutReflector(this.stream);
        rawOut.reflectArray(1, "chronosEvents");
        let base4 = Buffer.alloc(17);
        this.stream.buffer = Buffer.concat([this.stream.buffer, base4]);
        this.stream.offset += base4.length;

        /*let dump = ""
        this.stream.buffer.forEach(e => {
            dump += e.toString(16).padStart(2, '0') + " "
        });
        console.log(dump)*/
    }
}

module.exports = OwnHomeDataMessage