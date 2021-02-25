import ytch from "yt-channel-info"
import fs from "fs"

const channelId = "UCxthdekpMin2DTv4i-3AjDg"
const sortBy = "newest"
const outPath = "./data/videos.json"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getChannelVideos(channelId, sortBy, continuation) {
    let channelVideos
    try {
        if (continuation) {
            channelVideos = await ytch.getChannelVideosMore(continuation)
        } else {
            channelVideos = await ytch.getChannelVideos(channelId, sortBy)
        }
    } catch (error) {
        console.error(error)
        channelVideos = {
            items: [],
            continuation: null,
        }
    }
    return channelVideos
}

async function fetch() {
    let continuation = null
    let videos = []

    while (true) {
        const channelVideos = await getChannelVideos(channelId, sortBy, continuation)
        videos = [
            ...videos,
            ...channelVideos.items,
        ]
        console.log(`Collected ${videos.length} videos`)
        continuation = channelVideos.continuation
        if (continuation) {
            await sleep(1000)
        } else {
            break
        }
    }

    console.log("Writing data to file")
    const data = JSON.stringify(videos)
    fs.writeFileSync(outPath, data)

    console.log("Done")
}

export default fetch
