export const check2ArrayPermission = (arrPermissionAccount, arrPermissionFeature) => {
    if (arrPermissionFeature.length === 0) {
        return true
    }

    return arrPermissionFeature.some((per) => arrPermissionAccount.includes(`action${per}`))
}
