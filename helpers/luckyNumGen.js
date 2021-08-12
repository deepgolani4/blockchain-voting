/**
 *
 * @param {bday and uid} reqBody
 * @returns 6 digit lucky num
 */

module.exports = (reqBody) => {
  var { bday, uid } = reqBody;

  var lucky = parseInt(
    `${uid[11 - parseInt(bday[0])]}${uid[11 - parseInt(bday[3])]}`
  );

  lucky *= uid.charCodeAt(11 - parseInt(bday[5])) * 98765;
  lucky %= parseInt(uid.slice(0, 6));

  return lucky;
};
