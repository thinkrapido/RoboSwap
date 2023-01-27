
<script lang="ts">
    export let href: string = '#'
</script>


<span class="inline-block">
<a class="hover:underline"{href}>
<span class="p-2"><slot>---</slot></span>
</a>
<svg class="inline top-[-2px] left-[-5px]" xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px" viewBox="0 0 24 24"><path d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</span>