# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Connection](#connection)
    * [ConnectionResponse](#connectionresponse)
    * [Notification](#notification)
    * [NotificationResponse](#notificationresponse)
    * [ProfileField](#profilefield)
    * [ProfileMutationResponse](#profilemutationresponse)
    * [ProfileMutationsResponse](#profilemutationsresponse)
    * [QRCode](#qrcode)
    * [QRCodeResponse](#qrcoderesponse)
    * [User](#user)
    * [UserMutationResponse](#usermutationresponse)
  * [Inputs](#inputs)
    * [CoordinatesInput](#coordinatesinput)
    * [CreateProfileFieldInput](#createprofilefieldinput)
    * [CreateUserInput](#createuserinput)
    * [UpdateConnectionInput](#updateconnectioninput)
    * [UpdateProfileFieldInput](#updateprofilefieldinput)
    * [UpdateProfileFieldsInput](#updateprofilefieldsinput)
    * [UpdateUserInput](#updateuserinput)
  * [Enums](#enums)
    * [CacheControlScope](#cachecontrolscope)
    * [ConnectionStatus](#connectionstatus)
    * [ProfileFieldPrivacy](#profilefieldprivacy)
    * [ProfileFieldType](#profilefieldtype)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [Float](#float)
    * [ID](#id)
    * [Int](#int)
    * [String](#string)
    * [Upload](#upload)
  * [Interfaces](#interfaces)
    * [MutationResponse](#mutationresponse)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

Returns info for the logged in user if no ID is provided, otherwise for a specific user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>qrcode</strong></td>
<td valign="top"><a href="#qrcode">QRCode</a></td>
<td>

Returns a specific QR code by its ID.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>createUser</strong></td>
<td valign="top"><a href="#usermutationresponse">UserMutationResponse</a>!</td>
<td>

Creates a new user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#createuserinput">CreateUserInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateUser</strong></td>
<td valign="top"><a href="#usermutationresponse">UserMutationResponse</a>!</td>
<td>

Updates information for the logged in user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#updateuserinput">UpdateUserInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteUser</strong></td>
<td valign="top"><a href="#usermutationresponse">UserMutationResponse</a>!</td>
<td>

Deletes the currently logged in user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createProfileField</strong></td>
<td valign="top"><a href="#profilemutationresponse">ProfileMutationResponse</a>!</td>
<td>

Creates a profile field for the logged in user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#createprofilefieldinput">CreateProfileFieldInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createProfileFields</strong></td>
<td valign="top"><a href="#profilemutationsresponse">ProfileMutationsResponse</a>!</td>
<td>

Create multiple profile fields.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top">[<a href="#createprofilefieldinput">CreateProfileFieldInput</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateProfileField</strong></td>
<td valign="top"><a href="#profilemutationresponse">ProfileMutationResponse</a>!</td>
<td>

Updates information for a specific profile field.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#updateprofilefieldinput">UpdateProfileFieldInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateProfileFields</strong></td>
<td valign="top"><a href="#profilemutationsresponse">ProfileMutationsResponse</a>!</td>
<td>

Updates multiple profile fields.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top">[<a href="#updateprofilefieldsinput">UpdateProfileFieldsInput</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteProfileField</strong></td>
<td valign="top"><a href="#profilemutationresponse">ProfileMutationResponse</a>!</td>
<td>

Deletes a user's profile field (users can only delete their _own_ profile fields)

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteProfileFields</strong></td>
<td valign="top"><a href="#profilemutationsresponse">ProfileMutationsResponse</a>!</td>
<td>

Deletes multiple profile fields.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ids</td>
<td valign="top">[<a href="#id">ID</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createQRCode</strong></td>
<td valign="top"><a href="#qrcoderesponse">QRCodeResponse</a>!</td>
<td>

Creates a QRCode entry for a user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">label</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createConnection</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Creates a connection request to the specified user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">senderCoords</td>
<td valign="top"><a href="#coordinatesinput">CoordinatesInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>acceptConnection</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Accepts an incoming connection request.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">receiverCoords</td>
<td valign="top"><a href="#coordinatesinput">CoordinatesInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blockConnection</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Blocks an existing connection.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteConnection</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Deletes a connection entirely.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteNotification</strong></td>
<td valign="top"><a href="#notificationresponse">NotificationResponse</a>!</td>
<td>

Deletes a notification.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>

<tr>
<td colspan="2" valign="top"><strong>updateConnectionNote</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Updates a connection note.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">senderNote</td>
<td valign="top"><a href="#id">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">receiverNote</td>
<td valign="top"><a href="#id">String</a></td>
<td></td>
</tr>

<tr>
<td colspan="2" valign="top"><strong>deleteConnection</strong></td>
<td valign="top"><a href="#connectionresponse">ConnectionResponse</a>!</td>
<td>

Updates a connection event.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">senderEvent</td>
<td valign="top"><a href="#id">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">receiverEvent</td>
<td valign="top"><a href="#id">String</a></td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Connection

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sender</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiver</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blocker</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#connectionstatus">ConnectionStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>senderLat</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>senderLon</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiverLat</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiverLon</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>location</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>senderNote</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiverNote</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>senderEvent</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiverEvent</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### ConnectionResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>connection</strong></td>
<td valign="top"><a href="#connection">Connection</a></td>
<td></td>
</tr>
</tbody>
</table>

### Notification

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### NotificationResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notification</strong></td>
<td valign="top"><a href="#notification">Notification</a></td>
<td></td>
</tr>
</tbody>
</table>

### ProfileField

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#profilefieldtype">ProfileFieldType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>privacy</strong></td>
<td valign="top"><a href="#profilefieldprivacy">ProfileFieldPrivacy</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preferredContact</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
</tbody>
</table>

### ProfileMutationResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>profileField</strong></td>
<td valign="top"><a href="#profilefield">ProfileField</a></td>
<td></td>
</tr>
</tbody>
</table>

### ProfileMutationsResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>profileFields</strong></td>
<td valign="top">[<a href="#profilefield">ProfileField</a>]!</td>
<td></td>
</tr>
</tbody>
</table>

### QRCode

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>scans</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
</tbody>
</table>

### QRCodeResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>qrcode</strong></td>
<td valign="top"><a href="#qrcode">QRCode</a></td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>authId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>picture</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>birthdate</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>location</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>industry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>jobtitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tagline</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bio</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>profile</strong></td>
<td valign="top">[<a href="#profilefield">ProfileField</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>qrcodes</strong></td>
<td valign="top">[<a href="#qrcode">QRCode</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>connections</strong></td>
<td valign="top">[<a href="#connection">Connection</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sentConnections</strong></td>
<td valign="top">[<a href="#connection">Connection</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receivedConnections</strong></td>
<td valign="top">[<a href="#connection">Connection</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pendingConnections</strong></td>
<td valign="top">[<a href="#connection">Connection</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blockedConnections</strong></td>
<td valign="top">[<a href="#connection">Connection</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notifications</strong></td>
<td valign="top">[<a href="#notification">Notification</a>]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#notification">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UserMutationResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### CoordinatesInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>latitude</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>longitude</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateProfileFieldInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#profilefieldtype">ProfileFieldType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>privacy</strong></td>
<td valign="top"><a href="#profilefieldprivacy">ProfileFieldPrivacy</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preferredContact</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
</tbody>
</table>

### CreateUserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>picture</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>birthdate</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>location</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>industry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>jobtitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tagline</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bio</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateConnectionInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#connectionstatus">ConnectionStatus</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiverCoordinates</strong></td>
<td valign="top"><a href="#coordinatesinput">CoordinatesInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateProfileFieldInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#profilefieldtype">ProfileFieldType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>privacy</strong></td>
<td valign="top"><a href="#profilefieldprivacy">ProfileFieldPrivacy</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preferredContact</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateProfileFieldsInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#profilefieldtype">ProfileFieldType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>privacy</strong></td>
<td valign="top"><a href="#profilefieldprivacy">ProfileFieldPrivacy</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preferredContact</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateUserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>picture</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>birthdate</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>location</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>industry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>jobtitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tagline</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bio</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

## Enums

### CacheControlScope

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>PUBLIC</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PRIVATE</strong></td>
<td></td>
</tr>
</tbody>
</table>

### ConnectionStatus

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>PENDING</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>CONNECTED</strong></td>
<td></td>
</tr>
</tbody>
</table>

### ProfileFieldPrivacy

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>PUBLIC</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PRIVATE</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>CONNECTED</strong></td>
<td></td>
</tr>
</tbody>
</table>

### ProfileFieldType

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>EMAIL</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PHONE</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>SMS</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>INSTAGRAM</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>FACEBOOK</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>LINKEDIN</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>TWITTER</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Upload

The `Upload` scalar type represents a file upload.


## Interfaces


### MutationResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

A number that represents the status of the data transfer. Think of it like an HTTP status code.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>success</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

A boolean that indicates whether the mutation was successful.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A human-readable string that describes the result of the mutation. It is intended to be used in the UI of the product.

</td>
</tr>
</tbody>
</table>
