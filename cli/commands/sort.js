import fs from "fs"

const inPath = "./data/videos.json"
const sortKey = "viewCount"
const outPath = "./data/videos_sorted.json"

function sortByKey(array, key, desc = false) {
    return array.sort((a, b) => {
        const [x, y] = [a[key], b[key]]
        return (desc ? -1 : 1) * ((x < y) ? -1 : ((x > y) ? 1 : 0))
    });
}

function sort() {
    console.log("Reading data from file")
    const inData = fs.readFileSync(inPath)
    const videos = JSON.parse(inData)

    console.log(`Sorting ${videos.length} videos`)
    const sortedVideos = sortByKey(videos, sortKey, true)

    console.log("Writing data to file")
    const outData = JSON.stringify(sortedVideos)
    fs.writeFileSync(outPath, outData)

    console.log("Done")
}

export default sort
