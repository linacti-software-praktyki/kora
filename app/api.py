from app.blog.endpoints import router as blog_router
from app.finances.endpoints import router as finance_router
# from app.contact.endpoints import router as contact_router
from fastapi import APIRouter

router = APIRouter()
router.include_router(blog_router, prefix="/blog", tags=["Blog"])
router.include_router(finance_router, prefix="/finances", tags=["Finances"])
# router.include_router(contact_router, prefix="/contact", tags=["Contact"])
