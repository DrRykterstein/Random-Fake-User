<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script defer src="./js/random.js"></script>
  <title>Document</title>
</head>
<body>
  <?php include_once("./partials/navigation.php"); ?>
  <main class="wrapper">
    <h1 class="main-title">Fetch A Random User</h1>
    <div class="btn-container">
      <button class="btn btn-random" id="next">Fetch next user</button>
      <button class="btn btn-random" id="previous">Previous user</button>
    </div>
    <div class="user--container"></div>
  </main>
</body>
</html>