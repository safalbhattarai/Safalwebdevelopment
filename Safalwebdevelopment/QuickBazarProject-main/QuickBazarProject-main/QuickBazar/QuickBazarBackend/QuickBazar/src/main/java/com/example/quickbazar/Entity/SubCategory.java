package com.example.quickbazar.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subCategory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubCategory {
    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "item_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "subCategory_name", nullable = false)
    private String subCategoryName;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;


}