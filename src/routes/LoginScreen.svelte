<script lang='ts'>
	import { firebaseStore } from "$lib/stores/firebaseStore";
	import { orderStore } from "$lib/stores/orderStore";
	import { UserStore, userStore } from "$lib/stores/userStore";
	import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

    let email = '';
    let password = '';

    const formatter = Intl.NumberFormat('en', {notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2});

    let clear: NodeJS.Timer;
    $: {
    	 clearInterval(clear)
    	 clear = setInterval(changeNum, 1_000)
    }

    let num = 0;
    const changeNum = () => num = Math.random();

    $: usersCount = Math.floor(num*1_000_000 + 1_000_000)
    $: userCompact = formatter.format(usersCount)

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup($firebaseStore.auth!, provider)
            .then(async (result) => {

              // The signed-in user info.
              const user = result.user;
              
              $userStore = await UserStore.GetUserFrom(user);

              $userStore.loggedIn = true;

              await callback()
            })

    }

    const logIn = async () => {
        signInWithEmailAndPassword($firebaseStore.auth!, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          $userStore = await UserStore.GetUserFrom(user);

          await $firebaseStore.auth!.updateCurrentUser(user)

          $userStore.loggedIn = true;

          await callback()
        })
    }

    const callback = async () => {
        $orderStore.orders = $orderStore.get($userStore.isAdmin, $userStore.id)
    }
</script>

<section>
    <div class="side">
        <h1 id='title'>Bootleg Courier</h1>
        <h1>Join Us Now</h1>
        <span>We have around <b>{userCompact}</b> users!</span>
    </div>
    <div class="side">
        <button on:click={loginWithGoogle}>Log in with Google</button>
        <div id="separator">
            <div></div>
            <p>OR</p>
            <div></div>
        </div>
        <form on:submit={logIn}>
            <label for="logEmail">Email</label>
            <input id='logEmail' 
                   placeholder="Email" 
                   bind:value={email}
                   required/>
            <label for='logPasswd'>Password</label>
            <input id='logPasswd' 
                   placeholder="Password" 
                   type="password" 
                   bind:value={password}
                   required/>
            <input type="submit" value="Log In"/>
        </form>
    </div>
</section>

<style lang="scss">
    section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        flex: 1;
    }
    .side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem 3rem;
    
        & form {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }

    #logEmail, #logPasswd {
        transition: all .05s ease-in;
        &:invalid {
            border: 1px solid red;
        }
        &:hover { 
            border: 1px solid rgba(0,0,0,.7);
        }
    }

    #separator{
        display: grid;
        grid-template-columns: 5fr 1fr 5fr;
        align-items: center;

        & div {
            height: 0;
            border-top: 1px solid var(--color-text);
        }

        & p {
            margin: 0;
            text-align: center;
        }
    }
    #title {
        font-weight: bolder;
        margin: 0;
    }
</style>