export const adminSidebarItems = ['Dashboard', 'Product', 'Category', 'Orders', 'Admins', 'Setting']

export const adminAccountPath = "/account/admin/";
export const userAccountPath = "/account/user/";

export const POST_METHOD = (bodyField, contentType) => {
    return {
        method : 'POST',
        headers: {
            "Content-Type": contentType,
            "auth-token" : localStorage.getItem("auth-token")
        },
        body: JSON.stringify(bodyField)
        }
}

export const DELETE_WITHOUT_BODY = () => {
    return {
        method : 'DELETE',
        headers: {
            "auth-token" : localStorage.getItem("auth-token")
        },
        }
}