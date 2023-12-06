
<?php
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class SongRatingAppTest extends TestCase
{
    private $http;

    protected function setUp(): void
    {
        $this->http = new Client(['base_uri' => 'http://129.133.185.148/homework5/']);
    }

    // Test function for getting a list of all the users
    public function testGet_UserList()
    {
        $response = $this->http->request('GET', 'Controller/RestApi/User/read.php');
        $this->assertEquals(200, $response->getStatusCode());
    }

    // Test function for creating a new user in the application
    public function testPost_CreateUser()
    {
        // Make the POST request, including the form parameters
        $response = $this->http->request('POST', 'Controller/RestApi/User/create.php?username=phptest1&password=TestPassword1234');

        // Assert the expected status code
        $this->assertEquals(200, $response->getStatusCode());
    }

    // Test function to make sure a user can log in succesfully
    public function testPost_LoginUser()
    {
        // Define the data to be sent in the POST request
        $postData = json_encode([
            "login" => true,
            'username' => 'phptest1', // Replace with the desired username
            'password' => 'TestPassword1234' // Replace with the desired password
        ]);
    
        // Set the headers for JSON content type
        $headers = [
            'Content-Type' => 'application/json'
        ];
    
        // Make the POST request, including the JSON data
        $response = $this->http->request('POST', 'Controller/RestApi/Login/login.php', [
            'body' => $postData,
            'headers' => $headers
        ]);
    
        // Assert the expected status code
        $this->assertEquals(200, $response->getStatusCode());
    }

    // Test function for making sure if a login credential is wrong, user cant log in

    public function testPost_FailedLogin()
    {
        // Define the data for a failed login attempt
        $postData = json_encode([
            "login" => true,
            'username' => 'wrongUsername', // Non-existent or incorrect username
            'password' => 'wrongPassword'  // Incorrect password
        ]);

        // Set the headers for JSON content type
        $headers = [
            'Content-Type' => 'application/json'
        ];

        // Make the POST request, including the JSON data for failed login
        $response = $this->http->request('POST', 'Controller/RestApi/Login/login.php', [
            'body' => $postData,
            'headers' => $headers
        ]);

        // Assert the expected status code for a failed login
        $this->assertEquals(201, $response->getStatusCode());
    }

    // Test function to test the functionality of adding a new song 
    public function testPost_NewSong()
    {
        // Define the data for a new rating
        $postData = json_encode([
            "username" => "phptest0",
            "artist" => "Alex G",
            "song" => "Alex g song",
            "rating" => 2
        ]);

        // Set the headers for JSON content type
        $headers = [
            'Content-Type' => 'application/json'
        ];

        // Make the POST request, including the JSON data for creating a new rating
        $response = $this->http->request('POST', 'Controller/RestApi/Ratings/create-rating.php', [
            'body' => $postData,
            'headers' => $headers
        ]);

        // Assert the expected status code for creating a rating
        $this->assertEquals(200, $response->getStatusCode());
    }


    // Test function to test the functionality of updating an existing song 
    public function testPost_updateSong()
    {
        // Define the data for a new rating
        $postData = json_encode([
            "id" => 48,
            "username" => "phptest1",
            "artist" => "Mon Laferte",
            "song" => "Tu Falta de Querer",
            "rating" => 5
        ]);

        // Set the headers for JSON content type
        $headers = [
            'Content-Type' => 'application/json'
        ];

        // Make the POST request, including the JSON data for creating a new rating
        $response = $this->http->request('POST', 'Controller/RestApi/Ratings/update.php', [
            'body' => $postData,
            'headers' => $headers
        ]);

        // Assert the expected status code for creating a rating
        $this->assertEquals(200, $response->getStatusCode());
    }

    // Test function to test the functionality of deleting an existing song 
    public function testPost_DeleteSong()
    {
        // Define the song identifier
        $songName = 'Television'; // Replace with the name of the song to be deleted
    
        // Make the POST request, passing the song name as a query parameter
        $response = $this->http->request('DELETE', 'Controller/RestApi/Ratings/delete.php', [
            'query' => ['song' => $songName]
        ]);
    
        // Assert the expected status code for deleting a song
        $this->assertEquals(200, $response->getStatusCode());
    }

    protected function tearDown(): void
    {
        $this->http = null;
    }
}
?>
