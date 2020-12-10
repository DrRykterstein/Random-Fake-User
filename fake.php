<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script defer src="./js/fake.js"></script>
  <title>Fake API</title>
</head>
<body>
  <?php include_once("./partials/navigation.php"); ?>
  <form id="form">
    <label>Name <input id="name" type="text"></label>
    <label>User ID <input id="id" type="number"></label>
    <div class="submit-container">
      <input type="submit" class="btn" id="submit" value="Add User">
    </div>
  </form>
</body>
</html>