import LogicResources from "../Logic/Data/LogicResources"
import CSVNode from "./CSV/CSVNode"
import fs from "node:fs"
import path from "node:path"

class ResourceManager {
    static init () {
        ResourceManager.loadResources()
    }

    static loadResources () {
        const resources = LogicResources.createDataTableResourcesArray()

        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i]

            const fileName = resource.getFileName()

            const content = ResourceManager.loadResourceContent(fileName)

            if (content !== null) {
                const node = new CSVNode(content.split("\n"), fileName)
                LogicResources.load(resources, i, node)
            } else {
                Err(`ResourceManager.loadResources: file ${fileName} not exist.`)
            }
        }
    }

    static loadResourceContent (file) {
        try {
            const content = fs.readFileSync(path.join(__dirname.replace("/Titan", ""), "csv", file))

            return content.toString()
        } catch (e) {
            return null
        }
    }
}

export default ResourceManager