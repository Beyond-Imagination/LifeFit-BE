// const Community = require("../models/communities")
// const User = require("../models/users")
// const mongoose = require("mongoose")
const { communityData } = require("../dummy/dummy")

const getCommunityPostByChunk = async(req, res) => {
    try {
        const { start, end } = req.query

        let chunkData = []
        for (i = start; i < end; i++) {
            chunkData.push(communityData[i])
        }

        res.send(chunkData)
    } catch (error) {
        console.log(error)
    }
}

const getCommunityPostById = async(req, res) => {
    try {
        const { id } = req.params

        let data = null, i = 0
        communityData.forEach(post => {
            if (post.id == id) {
                data = post
            }
        })

        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send("data is not found")
        }
    } catch (error) {
        console.log(error)
    }
}

const createCommunityPost = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

const likeCommunityPost = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCommunityPostByChunk,
    getCommunityPostById,
    createCommunityPost,
    likeCommunityPost,
}