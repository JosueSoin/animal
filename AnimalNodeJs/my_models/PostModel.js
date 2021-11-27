class PostModel{

  constructor(
    id,
    idUser,
    idProvince,
    idCanton,
    text,
    type,
    status
  ) {
    this.id = id;
    this.idUser = idUser;
    this.idProvince = idProvince;
    this.idCanton = idCanton;
    this.text = text;
    this.type = type;
    this.status = status;
    this.pathList = [];
  }
  
}

exports.PostModel = PostModel