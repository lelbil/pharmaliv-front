exports.PATIENT = "PATIENT"
exports.DOCTOR = "DOCTOR"
exports.DELIVERY_MAN = "DELIVERY MAN"
exports.PHARMACIST = "PHARMACIST"

exports.USER_TYPES = [exports.PATIENT, exports.DOCTOR, exports.DELIVERY_MAN, exports.PHARMACIST]

exports.MEDICAMENTS = "MEDICAMENTS"
exports.HOMEO = "HOMEO"
exports.SANTE = "SANTE"
exports.COMPLEMENTS_ALIMENTAIRES = "COMPLEMENTS_ALIMENTAIRES"
exports.PLANTES = "PLANTES"
exports.VISAGE = "VISAGE"
exports.CORPS = "CORPS"
exports.HYGIENE = "HYGIENE"
exports.CHEVEUX = "CHEVEUX"
exports.BEBE = "BEBE"
exports.ORTHO = "ORTHO"
exports.BIO = "BIO"
exports.PROMO = "PROMO"

exports.filtresProduit = [
    exports.MEDICAMENTS,
    exports.HOMEO,
    exports.SANTE,
    exports.COMPLEMENTS_ALIMENTAIRES,
    exports.PLANTES,
    exports.VISAGE,
    exports.CORPS,
    exports.HYGIENE,
    exports.CHEVEUX,
    exports.BEBE,
    exports.ORTHO,
    exports.BIO,
    exports.PROMO,
]

exports.tableBGColour = "rgba(255,182,193,0.85)"

exports.API_URL = process.env.REACT_APP_API_URI || "http://localhost:3001"