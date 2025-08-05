function SignInAndOutButton({label,action}) {
  return (
    <form action={action}>
      <button className='flex items-center gap-6 text-xl sm:text-2xl text-gold-lighter bg-gold-dark rounded-full px-10 py-6 font-medium cursor-pointer'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
          />
        <span>{label}</span>
      </button>
    </form>
  );
}

export default SignInAndOutButton;
