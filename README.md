# Cloud Computing Documentation
This is a documentation for Near of Destination's Backend

## How to make a database in Cloud Firestore
before you can run this code, first you need to make sure you already have firestore running
1. Go to https://console.cloud.google.com/firestore and enable native mode.
2. Add the dataset to the database.
3. After add the database, check the database to know that all data are correct.

## How to install and use this repository

1.  clone the git repository
```
git clone https://github.com/Near-of-Destination-NoD-C241-PS414/cloud-computing.git
```
2. install the package
```
npm install
```
3. Make sure you already fill the .env based on your project, dont forget to also fill the Google Maps API Key
```
GOOGLE_MAPS_API_KEY= <your maps api  key>
PORT=8000

//get this from your project setting in firebase console
FIREBASE_API_KEY= <your firebase api key>
FIREBASE_AUTH_DOMAIN= 
FIREBASE_PROJECT_ID= 
FIREBASE_STORAGE_BUCKET= 
FIREBASE_MESSAGING_SENDER_ID= 
FIREBASE_APP_ID= 

MODEL_URL= <your model url>
DATA_URL= <your dataset url>
```

4. After that, don't forget to download the Firebase Private key, and change the file name to firebaseService.json.
   This is what the file look inside
```
{
  "type": "service_account",
  "project_id": "near-of-destination",
  "private_key_id": "<your-private-key-id>",
  "private_key": "-----BEGIN PRIVATE KEY-----\<your-private-key>==\n-----END PRIVATE KEY-----\n",
  "client_email": "<your-client_email>",
  "client_id": "<your-client_id",
  "auth_uri": "<your-auth_uri>",
  "token_uri": "<your-token_uri",
  "auth_provider_x509_cert_url": "<your-auth_provider_x509_cert_url>",
  "client_x509_cert_url": "<your-client_x509_cert_url>",
  "universe_domain": "googleapis.com"
}
```

5. After all of the requirement is set, you can run the code
```
npm run start
```

## API Endpoints
- We make 10 endpoints in total.
- 4 endpoints for user authentication, 3 endpoints for getting destination recommendation, 1 for place detail, and 2 for managing user review

## User Authentication API

URL
`/api/register`

Method
`POST`

Body Request
```
{
    "email":"tes@gmail.com",
    "password":"12345678"
}
```

Response
```
{
    "message": "Verification email sent! User created successfully!"
}
```


URL
`/api/login`

Method
`POST`

Body Request
```
{
    "email":"tes@gmail.com",
    "password":"12345678"
}
```

Response
```
{
    "message": "User logged in successfully",
    "userCredential": {
        "user": {
            "uid": "UTJ6wqX9oyeEb17QC6bnbQSgz2Q2",
            "email": "tes@gmail.com",
            "emailVerified": false,
            "isAnonymous": false,
            "providerData": [
                {
                    "providerId": "password",
                    "uid": "tes@gmail.com",
                    "displayName": null,
                    "email": "tes@gmail.com",
                    "phoneNumber": null,
                    "photoURL": null
                }
            ],
            "stsTokenManager": {
                "refreshToken": "AMf-vBygRy_t26BNcFLXXLFNmS-AbH33CthmewUvk_z2FOqicA0XyNDgNxtIDmkwdY0Xg9VZb2jQUyDxvOcH9IJl9Hko1JArMUnYLi9FoNzVc2vZlvfd0LkgwFeZflqqf4ya7oFKn0oaf3VHbrx_QgmJH99OGXCLzQDUbZ8WtN2-jyo9bBPfgjE7fJPkjKuyIZcfE0TEdmW1JQHE6YES8HYyxHNonL56NA",
                "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhci1vZi1kZXN0aW5hdGlvbiIsImF1ZCI6Im5lYXItb2YtZGVzdGluYXRpb24iLCJhdXRoX3RpbWUiOjE3MTg5NTEzNjEsInVzZXJfaWQiOiJVVEo2d3FYOW95ZUViMTdRQzZibmJRU2d6MlEyIiwic3ViIjoiVVRKNndxWDlveWVFYjE3UUM2Ym5iUVNnejJRMiIsImlhdCI6MTcxODk1MTM2MSwiZXhwIjoxNzE4OTU0OTYxLCJlbWFpbCI6InRlc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TYv_Aa-pWk4Fzu66rFpp3YPSCfo4P2HP06jFHVXlTfndYuCFifqT-G2UZcx29f33LhRLxZ10qtkz_HJfoKgMSbitVFLYkqqsXuovHB1pC5WH2wAflSUW0xbXwbpaq9au_OqFRtrGTV9gH5n__Ah9dr4FYDnmfxLM0J-R9mGsWDTa2Z_YsVaKCnkW2lWaKOo70hkLXCEfO3oDPwq7R3143-j170ax7o0uLoAQZ6Rk1mvaURAgryPBHVppcl0zaYy7Rt1yBfzB3VP563JeHLj_1tTffQuuR5KMMFvLYaqc6VPJaOO6ynGAUYZjW0SY6wQLIeOivd3TcEXnF-BFO2F84A",
                "expirationTime": 1718954960586
            },
            "createdAt": "1718951297126",
            "lastLoginAt": "1718951297126",
            "apiKey": "AIzaSyBeOq8UMrCVH7fUh9Z9xM_YCq2kstBIONY",
            "appName": "[DEFAULT]"
        },
        "providerId": null,
        "_tokenResponse": {
            "kind": "identitytoolkit#VerifyPasswordResponse",
            "localId": "UTJ6wqX9oyeEb17QC6bnbQSgz2Q2",
            "email": "tes@gmail.com",
            "displayName": "",
            "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhci1vZi1kZXN0aW5hdGlvbiIsImF1ZCI6Im5lYXItb2YtZGVzdGluYXRpb24iLCJhdXRoX3RpbWUiOjE3MTg5NTEzNjEsInVzZXJfaWQiOiJVVEo2d3FYOW95ZUViMTdRQzZibmJRU2d6MlEyIiwic3ViIjoiVVRKNndxWDlveWVFYjE3UUM2Ym5iUVNnejJRMiIsImlhdCI6MTcxODk1MTM2MSwiZXhwIjoxNzE4OTU0OTYxLCJlbWFpbCI6InRlc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TYv_Aa-pWk4Fzu66rFpp3YPSCfo4P2HP06jFHVXlTfndYuCFifqT-G2UZcx29f33LhRLxZ10qtkz_HJfoKgMSbitVFLYkqqsXuovHB1pC5WH2wAflSUW0xbXwbpaq9au_OqFRtrGTV9gH5n__Ah9dr4FYDnmfxLM0J-R9mGsWDTa2Z_YsVaKCnkW2lWaKOo70hkLXCEfO3oDPwq7R3143-j170ax7o0uLoAQZ6Rk1mvaURAgryPBHVppcl0zaYy7Rt1yBfzB3VP563JeHLj_1tTffQuuR5KMMFvLYaqc6VPJaOO6ynGAUYZjW0SY6wQLIeOivd3TcEXnF-BFO2F84A",
            "registered": true,
            "refreshToken": "AMf-vBygRy_t26BNcFLXXLFNmS-AbH33CthmewUvk_z2FOqicA0XyNDgNxtIDmkwdY0Xg9VZb2jQUyDxvOcH9IJl9Hko1JArMUnYLi9FoNzVc2vZlvfd0LkgwFeZflqqf4ya7oFKn0oaf3VHbrx_QgmJH99OGXCLzQDUbZ8WtN2-jyo9bBPfgjE7fJPkjKuyIZcfE0TEdmW1JQHE6YES8HYyxHNonL56NA",
            "expiresIn": "3600"
        },
        "operationType": "signIn"
    }
}
```


URL
`/api/reset-password`

Method
`POST`

Body Request
```
{
    "email":"tes@gmail.com",
}
```

Response
```
{
    "message": "Password reset email sent successfully!"
}
```


URL
`/api/logout`

Method
`POST`

Response
```
{
    "message": "User logged out successfully"
}
```

## Destination Recommendation API

URL
`/search/nearby`

Method
`POST`

Body Request
```
{
    "latitude":0.5164316259131522,
    "longitude": 101.45737659201386,
}
```

Response
```
[
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "hutan kota pekanbaru",
        "Jenis Wisata": "Taman",
        "Reviews": 356,
        "Rating": 4.3,
        "User_Distance": "0.164 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rth putri kaca mayang",
        "Jenis Wisata": "Taman",
        "Reviews": 3499,
        "Rating": 4.3,
        "User_Distance": "1.051 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "tugu titik nol pekanbaru",
        "Jenis Wisata": "Monumen",
        "Reviews": 79,
        "Rating": 4.3,
        "User_Distance": "2.966 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rumah singgah tuan kadi",
        "Jenis Wisata": "Taman",
        "Reviews": 1074,
        "Rating": 4.5,
        "User_Distance": "3.314 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "kolam renang kamboja indah",
        "Jenis Wisata": "Air",
        "Reviews": 34,
        "Rating": 4.6,
        "User_Distance": "3.402 km"
    },
    ...
]
```


URL
`/search/category`

Method
`POST`

Body Request
```
{
    "latitude":0.5164316259131522,
    "longitude": 101.45737659201386,
    "category":"Taman" //Air, Bukit, Monumen, Religi, Taman 
}
```

Response
```
[
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "hutan kota pekanbaru",
        "Jenis Wisata": "Taman",
        "Reviews": 356,
        "Rating": 4.3,
        "User_Distance": "0.164 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rth putri kaca mayang",
        "Jenis Wisata": "Taman",
        "Reviews": 3499,
        "Rating": 4.3,
        "User_Distance": "1.051 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rumah singgah tuan kadi",
        "Jenis Wisata": "Taman",
        "Reviews": 1074,
        "Rating": 4.5,
        "User_Distance": "3.314 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "alam mayang",
        "Jenis Wisata": "Taman",
        "Reviews": 414,
        "Rating": 4.5,
        "User_Distance": "5.392 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "alam mayang park",
        "Jenis Wisata": "Taman",
        "Reviews": 639,
        "Rating": 4.3,
        "User_Distance": "5.517 km"
    },
    ...
]
```


URL
`/search/review`

Method
`POST`

Body Request
```
{
    "latitude":0.5164316259131522,
    "longitude": 101.45737659201386,
}
```

Response
```
[
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rth putri kaca mayang",
        "Jenis Wisata": "Taman",
        "Reviews": 3499,
        "Rating": 4.3,
        "User_Distance": "1.051 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "citraland waterpark",
        "Jenis Wisata": "Air",
        "Reviews": 1314,
        "Rating": 4.3,
        "User_Distance": "4.918 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "rumah singgah tuan kadi",
        "Jenis Wisata": "Taman",
        "Reviews": 1074,
        "Rating": 4.5,
        "User_Distance": "3.314 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "alam mayang park",
        "Jenis Wisata": "Taman",
        "Reviews": 639,
        "Rating": 4.3,
        "User_Distance": "5.517 km"
    },
    {
        "Kabupaten/Kota": "Pekanbaru",
        "Nama Wisata": "sentosa swimming pool & waterboom",
        "Jenis Wisata": "Air",
        "Reviews": 620,
        "Rating": 4.3,
        "User_Distance": "5.161 km"
    },
    ...
]
```

## Place Details API

URL
`/search/details/:name`

Method
`Get`

Response
```
{
    "status": "Berhasil",
    "data": {
        "placeData": {
            "Wisata_Bukit": "False",
            "Wisata_Religi": "False",
            "Jenis Wisata": "Taman",
            "Rating": 4.3,
            "Wisata_Air": "False",
            "Kabupaten/Kota Encoded": 337,
            "Latitude": 0.5159863,
            "Longitude": 101.4559692,
            "Wilayah": "Sumatra",
            "Reviews": 356,
            "Nama Wisata": "hutan kota pekanbaru",
            "Jenis Wisata Encoded": 4,
            "Nama Wisata Encoded": 4238,
            "Provinsi": "Riau",
            "Wisata_Taman": "True",
            "Wisata_Monumen": "False",
            "Kabupaten/Kota": "Pekanbaru",
            "types": [
                "park",
                "tourist_attraction",
                "point_of_interest",
                "establishment"
            ],
            "reviews": [
                {
                    "author_name": "Agustinus Malau",
                    "author_url": "https://www.google.com/maps/contrib/101603874843978840932/reviews",
                    "language": "id",
                    "original_language": "id",
                    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWDLWAyekQ20kUkGHJ9NvhEfulxBbSGgETrZLzw79INrswmN3Jc=s128-c0x00000000-cc-rp-mo-ba4",
                    "rating": 5,
                    "relative_time_description": "7 bulan lalu",
                    "text": "Ini perlu diperhatikan lagi oleh pengelola..\nDiperbanyak Fasilitas lainnya seperti wastafel atau Toiletnya...\nDi tambah variasi jenis tanamannya supaya lebih beragam...",
                    "time": 1699960892,
                    "translated": false
                },
                {
                    "author_name": "Sekar Muriani",
                    "author_url": "https://www.google.com/maps/contrib/104250787341959740494/reviews",
                    "language": "id",
                    "original_language": "id",
                    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjU2Ulz0AqH3qva9qIRexMi8z_YjN8rbNJ9_A0WQ6278y0DxjJ7i=s128-c0x00000000-cc-rp-mo-ba4",
                    "rating": 5,
                    "relative_time_description": "setahun yang lalu",
                    "text": "Ini tempat yang sangat nyaman walau untuk sekedar bersantai seperti duduk\" karena banyak disediakan tempat duduk atau bisa sambil baca buku, jogging juga bisa apalagi sambil menikmati pemandangan pepohonannya yang rindang.\n\nHanya saja bagi pengunjung masih perlu kesadaran diri masing-masing, untuk tidak sembarangan membuang sampah plastik. Tempat sampah telah disediakan, jadi tidak ada alasan untuk membuang sampah dengan sembarangan.\n\nTempat ini bisa jadi rekomendasi bagi yang ingin menikmati alam di Pekanbaru. Akses jalan menuju lokasi juga strategis, jadi bisa dengan mudah untuk dikunjungi.",
                    "time": 1676608594,
                    "translated": false
                },
                ...
            ],
            "place_id": "ChIJpwvteaCu1TERJS23CO1qfZ8",
            "photos": [
                {
                    "height": 4000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/102950078710374836974\">KAMPARSKY iD</a>"
                    ],
                    "photo_reference": "AUc7tXVEz6XxNx003omF9XHNUp9G3x-jmFWWOclDvXMXryvTlTwGruTM71zGUE0OWXsTWlu-pcKTqq8h6UcOtnLUK7Q9VLjvjNXhPiODxDKpG6Z8b5wWNgnYUvaMVQQnH66IC8KoAvrtj00uhLZ4J6L3QiAXvCQGCsS7nlSkB4b-UXBYUsfb",
                    "width": 3000
                },
                {
                    "height": 2304,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104250787341959740494\">Sekar Muriani</a>"
                    ],
                    "photo_reference": "AUc7tXV0iL-jqE2YMegc24H6_5Fvt32hSDw_N1u7LAs_lNb2WVTW3lY6riD9jO_lDtk3dV_vOfQ_MbLlaMe4rOcaN0q5PgRKzLXa7-CCGEBd47YfS13LpPXvQofOy9-IoxAAKhWhn6Pt8s9-MyAkSIT-3bQGgAQAxuZzg81fZG-kt-aw73Nd",
                    "width": 4096
                },
                ...
            ]
        },
        "isNewData": false
    }
}
```

## User Review API

URL
`/reviews/:name`

Method
`POST`

Body Request
```
{
    "rating":"5",
    "comment":"Tempat ini sangatlah bagus!! Recomendedd!!!"
}
```

Response
```
{
    "message": "Review added successfully"
}
```

URL
`/reviews/:name`

Method
`GET`

Response
```
[
    {
        "uid": "FXZFlGNeliTKk0XYNsT9dYGwYwa2",
        "placeId": "ChIJqWTtHsj_aS4ReFZ2a0jLCdM",
        "rating": "5",
        "comment": "Sudah beberapa kali kesini gapernah bosen",
        "timestamp": "2024-06-21T07:11:43.733Z",
        "email": "bayurintis@gmail.com",
        "displayName": null
    },
    {
        "uid": "UTJ6wqX9oyeEb17QC6bnbQSgz2Q2",
        "placeId": "ChIJqWTtHsj_aS4ReFZ2a0jLCdM",
        "rating": "5",
        "comment": "Tempat ini sangatlah bagus!! Recomendedd!!!",
        "timestamp": "2024-06-21T07:09:54.489Z",
        "email": "tes@gmail.com",
        "displayName": null
    }
]
```
