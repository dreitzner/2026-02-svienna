import { getTodos } from "../todos.remote"

const internal_todo_call = async () => await getTodos()

export const GET = async () => {
    const todos = await internal_todo_call()
    return new Response(JSON.stringify(todos));
};

export type TodoResponse = typeof internal_todo_call;