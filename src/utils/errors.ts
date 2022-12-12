export function conflict() {
    return { type: "conflict", statusCode: 409, message: "Ops, aconteceu algum conflito." };
}
  
export function notFound() {
    return { type: "not_found", statusCode: 404, message: "Ops, não encontramos o que você buscou" };
}

export function forbidden() {
    return { type: "forbidden", statusCode: 403, message: "Ops, você não tem permissão para fazer isso" };
}