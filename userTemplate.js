const userTemplate = (req) => {
  const { fullName } = req
  return `<html>

  <head>Hello ${fullName} Your Account Has Been Created...</head>

  <body>

    <h1
      style="background-color: aqua;text-align: center;text-decoration-color: antiquewhite;font-weight: bolder;color:lightcoral;">
      Your Account Has Registered Successfully..</h1>
    <h2
      style="background-color: rgb(116, 160, 160);text-align: center;text-decoration-color: rgb(241, 185, 112);font-weight: bolder;color:rgba(233, 189, 189, 0.698);">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum necessitatibus autem adipisci quas obcaecati magnam eligendi accusamus vel sunt, voluptate laborum rem libero consequatur officiis dicta. Voluptatum cupiditate corporis suscipit.</h2>

  </body>

</html>`
}

module.exports = userTemplate;