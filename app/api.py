from app.blog.endpoints import router as blog_router
from app.trackerofwork.endpoints import router as tracker_router
# from app.contact.endpoints import router as contact_router
from fastapi import APIRouter

router = APIRouter()
router.include_router(blog_router, prefix="/blog", tags=["Blog"])
router.include_router(tracker_router, prefix="/trackerofwork", tags=["TrackerOfWork"])
# router.include_router(contact_router, prefix="/contact", tags=["Contact"])
