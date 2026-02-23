import { query } from "$app/server";
import type {TodoResponse } from "../../../../admin/src/routes/api/+server"
type Todos = Awaited<ReturnType<TodoResponse>>
export const getTodos = query(async() => {
    const response = await fetch('http:localhost:8080/api');
    const json = await response.json() as Todos
    return json;
})