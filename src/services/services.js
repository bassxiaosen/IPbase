/**
 * Created by bassxiaosen1 on 2017/10/23.
 */
import {Fetch} from "./Fetch"

export async function login(value){
    return Fetch(
        `/base/api/login`,{
            method:'POST',
            body:JSON.stringify(value)
        }
    )
}

export async function getUser(pageNum,pageSize) {
    return Fetch(
        `/base/api/user?pageNum=${pageNum}&pageSize=${pageSize}`,{
            method:'GET'
        }
    )
}

export async function deleteUser(id){
    return Fetch(
        `/base/api/user/${id}`,{
            method:'DELETE'
        }
    )
}

export async function getArrange(pageNum,pageSize) {
    return Fetch(
        `/base/api/attend?pageNum=${pageNum}&pageSize=${pageSize}`,{
            method:'GET'
        }
    )
}

export async function getDynamic(pageNum,pageSize) {
    return Fetch(
        `/base/api/dynamic?pageNum=${pageNum}&pageSize=${pageSize}`
    )
}

export async function addDynamic(data){
    return Fetch(
        `/base/api/dynamic`,{
            method:'POST',
            body:JSON.stringify(data)
        }
    )
}

export async function getUploadToken() {
    return Fetch(
        `/base/api/qiniu/getToken`
    )
}

export async function deteleArticle(data) {
    return Fetch(
        `/base/api/dynamic/batchDelete`,{
            method:'PUT',
            body:JSON.stringify(data)
        }
    )
}

export async function getProject(pageNum,pageSize){
    return Fetch(
        `/base/api/project?pageNum=${pageNum}&pageSize=${pageSize}`
    )
}

export async function deleteProject(data) {
    return Fetch(
        `/base/api/project/batchDelete`,{
            method:'PUT',
            body:JSON.stringify(data)
        }
    )
}

export async function addProject(data) {
    return Fetch(
        `/base/api/project`,{
            method:'POST',
            body:JSON.stringify(data)
        }
    )
}

export async function addArrange(data) {
    return Fetch(
        `/base/api/attend`,{
            method:'POST',
            body:JSON.stringify(data)
        }
    )
}

export async function deleteArrange(id){
    return Fetch(
        `/base/api/attend/${id}`,{
            method:'DELETE'
        }
    )
}

export async function editArrange(data) {
    return Fetch(
        `/base/api/attend`,{
            method:'PUT',
            body:JSON.stringify(data)
        }
    )
}

export async function getAllUser() {
    return Fetch(
        `/base/api/user?all=true`
    )
}

export async function getCheckDetail(data) {
    return Fetch(
        `/base/api/check/getCheck`,{
            method:'PUT',
            body:JSON.stringify(data)
        }
    )
}