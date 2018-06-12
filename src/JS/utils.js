
exports.includes = (array, value) => {
    return array.indexOf(value) >= 0
}

exports.isPropertyTrue = (array, property) => {
    let element
    for (element of array) {
        if (element[property]) return true
    }
    return false
}

/**
 * An alternative way to splice an element out of an array, returning a new array instead of modifying the existing one.
 * Thus respecting functional programming paradigm
 */
exports.eliminate = (array, indexToEliminate) =>  array.filter((element, index) => index !== indexToEliminate)

exports.getExactInfo = info => {
    const type = info.type

    const transversalInfo = {
        user: info.user,
        password: info.password,
        address: info.adresse,
        email: info.email,
        tel: info.tel,
    }

    if (type !== 'pharmacistContent') {
        transversalInfo.fname = info.prenom
        transversalInfo.lname = info.nom
    }

    if (type === 'patientContent') {
        return {
            ...transversalInfo,
            nss: info.nss,
            dob: new Date(info.dob), //Won't work, find a work-around (parse to date?)
        }
    }
    if (type === 'pharmacistContent') {
        return {
            ...transversalInfo,
            pharmaName: info.denomination,
            siren: info.siren,
        }
    }
    if (type === 'deliveryManContent') {
        return {
            ...transversalInfo,
            deliveryCompany: info.denomination,
        }
    }

    return transversalInfo
}