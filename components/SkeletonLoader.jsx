import React from "react"

export function SkeletonText({ width = "100%" }) {
    return <div className="skeleton skeleton-text" style={{ width }}></div>
}

export function SkeletonTitle() {
    return <div className="skeleton skeleton-title"></div>
}

export function SkeletonImage() {
    return <div className="skeleton skeleton-image"></div>
}

export function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <SkeletonImage />
            <SkeletonTitle />
            <SkeletonText width="80%" />
            <SkeletonText width="60%" />
        </div>
    )
}

export function VanListSkeleton() {
    return (
        <div className="van-list-container">
            <SkeletonTitle />
            <div className="skeleton-grid">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    )
}

export function VanDetailSkeleton() {
    return (
        <div className="van-detail-container">
            <SkeletonText width="120px" />
            <SkeletonImage />
            <SkeletonTitle />
            <SkeletonText width="40%" />
            <SkeletonText width="90%" />
            <SkeletonText width="85%" />
            <SkeletonText width="95%" />
        </div>
    )
}

export function HostVansSkeleton() {
    return (
        <section>
            <div className="host-vans-title">
                <SkeletonTitle />
            </div>
            <div className="host-vans-list">
                <HostVanItemSkeleton />
                <HostVanItemSkeleton />
                <HostVanItemSkeleton />
            </div>
        </section>
    )
}

export function HostVanItemSkeleton() {
    return (
        <div className="host-van-single">
            <div className="skeleton skeleton-image" style={{ width: "70px", height: "70px", borderRadius: "5px" }}></div>
            <div className="host-van-info" style={{ flex: 1 }}>
                <SkeletonText width="60%" />
                <SkeletonText width="40%" />
            </div>
        </div>
    )
}

export function HostVanDetailSkeleton() {
    return (
        <section>
            <SkeletonText width="140px" />
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <div className="skeleton skeleton-image" style={{ width: "160px", height: "160px", borderRadius: "5px" }}></div>
                    <div className="host-van-detail-info-text">
                        <SkeletonText width="80px" />
                        <SkeletonTitle />
                        <SkeletonText width="100px" />
                    </div>
                </div>
                <div className="host-van-detail-nav" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    <SkeletonText width="60px" />
                    <SkeletonText width="60px" />
                    <SkeletonText width="60px" />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <SkeletonText width="90%" />
                    <SkeletonText width="80%" />
                    <SkeletonText width="85%" />
                </div>
            </div>
        </section>
    )
}

export function DashboardSkeleton() {
    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <SkeletonTitle />
                    <SkeletonText width="150px" />
                    <SkeletonText width="100px" />
                </div>
                <SkeletonText width="60px" />
            </section>
            <section className="host-dashboard-reviews">
                <SkeletonText width="120px" />
                <SkeletonText width="80px" />
                <SkeletonText width="60px" />
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <SkeletonTitle />
                    <SkeletonText width="70px" />
                </div>
                <div className="host-vans-list">
                    <HostVanItemSkeleton />
                    <HostVanItemSkeleton />
                </div>
            </section>
        </>
    )
}
