const linkRegex = /(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g

function replaceLinks(matched) {
  let withProtocol = matched

  if(!withProtocol.startsWith("http")) {
    withProtocol = "http://" + matched
  }

  const newStr = `<a
    href="${withProtocol}"
    class="link"
  >
    ${matched}
  </a>`

  return newStr
}

export default function formatText(text) {
  let formattedText = text.replace(linkRegex, replaceLinks);
  return formattedText.replace(/(\r\n)+/g, '<br>');
}