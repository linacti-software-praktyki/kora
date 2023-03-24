function EducationBlock({title, children})
{
    return (
        <li class="p-8 my-12 relative">
            <h3 class="text-[#111827]">{title}</h3>
            <hr class="opacity-20 border border-[#111827]"/>
            <div class="ml-12 mt-12">{children}</div>
        </li>
    )
}
export default EducationBlock;