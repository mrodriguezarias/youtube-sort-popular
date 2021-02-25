import fs from "fs"

const inPath = "./data/videos_sorted.json"
const outPath = "./data/videos_mapped.json"


function mapVideo(video) {
    const {
        title,
        videoId,
        viewCount,
        videoThumbnails,
    } = video
    return {
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        views: viewCount,
        thumbnail: videoThumbnails.slice(-1)[0].url, // width: 336, height: 188
    }
}

function map() {
    console.log("Reading data from file")
    const inData = fs.readFileSync(inPath)
    const videos = JSON.parse(inData)

    console.log(`Mapping ${videos.length} videos`)
    const mappedVideos = videos.map(mapVideo)

    console.log("Writing data to file")
    const outData = JSON.stringify(mappedVideos)
    fs.writeFileSync(outPath, outData)

    console.log("Done")
}

export default map
